/**
 * create a channel to receive or transmit information through the DOM
 * @template T
 */
export class Channel extends Event {
  #subs = new Subs();
  #clean = new Subs();
  /**
   * @param {HTMLElement} host
   * @param {string} type
   */
  constructor(host, type, composed = false) {
    super(type, { bubbles: true, composed });
    this.host = host;
  }
  /**
   *
   * @param {T} state
   */
  cast(castDown) {
    this.#subs.emit((this.castDown = castDown));
  }
  /**
   * Connect the channel to the DOM event system
   * @param {(cast:T)=>any} observe
   */
  connect(observe) {
    if (observe) this.observe = observe;

    this.host.dispatchEvent(this);
    /**
     * @param {Channel} event
     */
    const listener = (event) => {
      if (event instanceof this.constructor && event.type == this.type) {
        event.stopPropagation();
        event._sync(this);
      }
    };

    this.host.addEventListener(this.type, listener);
    this.#clean.add(() => {
      delete this.observe;
      this.host.removeEventListener(this.type, listener);
    });
  }
  /**
   * Disconnect the channel to the DOM event system
   */
  disconnect() {
    this.#clean.emit();
  }
  /**
   * @param {Channel} parent
   */
  _sync(parent) {
    const emit = (castUp) => {
      this.castUp = castUp;
      this.observe && this.observe(castUp);
      !("castDown" in this) && this.#subs.emit(castUp);
    };

    this.#clean.add(parent.#subs.add(emit));

    if ("castDown" in parent) {
      emit(parent.castDown);
    } else if ("castUp" in parent) {
      emit(parent.castUp);
    }
  }
}

class Subs extends Set {
  add = (sub) => super.add(sub) && (() => this.delete(sub));
  emit = (value) => this.forEach((sub) => sub(value));
}
