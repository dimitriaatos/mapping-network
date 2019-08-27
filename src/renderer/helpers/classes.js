const Change = class {
  item
  #clear = true
  check(i) {
    const change = this.#clear ? false : this.item === i
    this.#clear = false
    this.item = i
    return change
  }
  reset() {
    this.#clear = true
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
  smooth = 100
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
  #timeInterval

  /**
   * input 
   * @param {number} value - The raw position value
   * @param {number} time - The timestame of the input
   * @return {undefined} The method doesnt return anything
   */
  input(value, time) {
    if (this.state) {
      if (this.#active) {
        this.#timeInterval = time - this.#time
        this.#raw = Math.abs(this.#value - value) / this.#timeInterval || this.#raw
        if (this.#normalize) {
          this.max = Math.max(this.max, this.#raw)
        } else this.#output(clip(this.#raw / this.max), this.#timeInterval)
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
    if (mode) {
      this.max = 0
    }
    this.#normalize = mode
  }
}

export { Change, Speed }
