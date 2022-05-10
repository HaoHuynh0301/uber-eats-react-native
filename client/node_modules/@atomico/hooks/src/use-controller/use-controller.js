import { useLayoutEffect, useState, useUpdate } from "atomico";

const microtask = Promise.resolve();

/**
 * An implementation of ReactiveControllerHost that is driven by hooks
 * and `useController()`.
 *
 * @license
 * Portions Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class AtomicoControllerHost {
  /** @type {import('@lit/reactive-element').ReactiveController} */
  primaryController;

  /**
   * @type {import('@lit/reactive-element').ReactiveController[]}
   * @private
   */
  _controllers = [];

  /** @private */
  _updatePending = false;

  /**
   * @type {Promise<boolean>}
   * @private
   */
  _updateCompletePromise = new Promise((r) => {
    this._resolveUpdate = r;
  });

  /**
   * @type {(value: boolean | PromiseLike<boolean>) => void}
   * @private
   */
  _resolveUpdate;

  constructor(force) {
    this.force = force;
    this._updateCompletePromise = new Promise((res) => {
      this._resolveUpdate = res;
    });
  }

  /**
   * @param {import('@lit/reactive-element').ReactiveController} controller
   */
  addController(controller) {
    this._controllers.push(controller);
  }

  /**
   * @param {import('@lit/reactive-element').ReactiveController} controller
   */
  removeController(controller) {
    // Note, if the indexOf is -1, the >>> will flip the sign which makes the
    // splice do nothing.
    this._controllers &&
      this._controllers.splice(this._controllers.indexOf(controller) >>> 0, 1);
  }

  requestUpdate() {
    if (!this._updatePending) {
      this._updatePending = true;
      microtask.then(() => this.force());
    }
  }

  /**
   * @return {Promise<boolean>}
   */
  get updateComplete() {
    return this._updateCompletePromise;
  }

  /** @internal */
  _connected() {
    this._controllers.forEach((c) => c.hostConnected && c.hostConnected());
  }

  /** @internal */
  _disconnected() {
    this._controllers.forEach(
      (c) => c.hostDisconnected && c.hostDisconnected()
    );
  }

  /** @internal */
  _update() {
    this._controllers.forEach((c) => c.hostUpdate && c.hostUpdate());
  }

  /** @internal */
  _updated() {
    this._updatePending = false;
    const resolve = this._resolveUpdate;
    // Create a new updateComplete Promise for the next update,
    // before resolving the current one.
    this._updateCompletePromise = new Promise((res) => {
      this._resolveUpdate = res;
    });
    this._controllers.forEach((c) => c.hostUpdated && c.hostUpdated());
    resolve(this._updatePending);
  }
}

/**
 * Creates and stores a stateful ReactiveController instance and provides it
 * with a ReactiveControllerHost that drives the controller lifecycle.
 *
 * Use this hook to convert a ReactiveController into a Atomico hook.
 *
 * @param createController A function that creates a controller instance. This
 * function is given a AtomicoControllerHost to pass to the controller. The
 * create function is only called once per component.
 *
 * @template {import("@lit/reactive-element").ReactiveController} C
 * @param {(host: import("@lit/reactive-element").ReactiveControllerHost) => C} createController
 * @return {C}
 */
export function useController(createController) {
  const force = useUpdate();
  const [host] = useState(() => {
    const host = new AtomicoControllerHost(force);
    const controller = createController(host);
    host.primaryController = controller;
    host._connected();
    return host;
  });

  host._updatePending = true;

  // We use useLayoutEffect because we need updated() called synchronously
  // after rendering.
  useLayoutEffect(() => host._updated());

  // Returning a cleanup function simulates hostDisconnected timing. An empty
  // deps array tells Atomico to only call this once: on mount with the cleanup
  // called on unmount.
  useLayoutEffect(() => () => host._disconnected(), []);

  host._update();

  return host.primaryController;
}
