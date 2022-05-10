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
export function useController<C extends import("@lit/reactive-element").ReactiveController>(createController: (host: import("@lit/reactive-element").ReactiveControllerHost) => C): C;
