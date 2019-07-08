class Change {
  constructor() {
    this.item
  }
  check(i){
    const change = this.item == i
    this.item = i
    return change
  }
}

class Counter {
  constructor(init = 0, exclude = []){
    this.init = init
    this.value = this.init
    this.exclude = exclude
  }
  next(){
    this.value += 1
    while (this.exclude.includes(this.value)) {
      this.value += 1
    }
    return this.value
  }
  reset(){
    return this.value = this.init
  }
}

export {Change, Counter}
