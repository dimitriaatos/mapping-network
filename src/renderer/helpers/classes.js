const Change = class {
  item
  check(i) {
    const change = this.item == i
    this.item = i
    return change
  }
}

const Counter = class {
  constructor(init = 0, exclude = []) {
    this.init = init
    this.value = init
    this.exclude = exclude
  }
  next() {
    this.value += 1
    while (this.exclude.includes(this.value)) {
      this.value += 1
    }
    return this.value
  }
  reset() {
    return this.value = this.init
  }
}

import { clip } from './functions'

/**
 * Class for calculating speed
 */

const Speed = class {

  /**
   * Initializing class
   * @param {object} options - initializing smooth and max
   */
  constructor(options) {
    Object.assign(this, options)
  }

  /** @property {number} smooth - set smoothing of speed */
  smooth = 30
  /** @property {number} max - set maximum raw speed that outputs 1 */
  max = 0
  state = false
  
  #value = 0
  #time
  #stop = setTimeout(()=>{}, 0)
  #active = false
  #normalize = false
  #raw = 0
  #output

  /**
   * input 
   * @param {number} value - The raw position value
   * @param {number} time - The timestame of the input
   * @return {undefined} The method doesnt return anything
   */
  input(value, time) {
    if (this.state) {
      if (this.#active) {
        this.#raw = Math.abs(this.#value - value)/(time - this.#time) || this.#raw
        if (this.#normalize) {
          this.max = Math.max(this.max, this.#raw)
        } else this.#output(clip(this.#raw / this.max))
        clearTimeout(this.#stop)
        this.#stop = setTimeout(() => {
          this.#output(0)
          this.#active = false
        }, this.smooth)
      }
      this.#active = true
      this.#value = value
      this.#time = time
    } else {
      this.#output(value)
    }
  }
  set output(fn) {
    this.#output = fn
  }
  get normalize() {
    return this.#normalize
  }
  set normalize(mode) {
    mode && (this.max = 0)
    this.#normalize = mode
  }
}

export { Change, Counter, Speed }
