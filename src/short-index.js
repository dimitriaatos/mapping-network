export default class shortIndex {
  constructor(){
    this.inArray = new Array()
    this.length = this.inArray.length
  }

  add(index){
    this.inArray.push(index)
    this.inArray.sort((a, b) => a - b)
    return this.getShort(index)
  }

  delete(index) {
    let short = this.getShort(index)
    this.inArray.splice(short, 1)
    return short
  }

  getShort(index) {
    return this.inArray.indexOf(index)
  }

  getLong(index) {
    return this.inArray[index]
  }
}
