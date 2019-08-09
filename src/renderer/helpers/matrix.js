// const relative = (row, c, value) => {
//   row[c] = value
//   let sum = 0
//   for (let i = 0; i < row.length; i++) {
//     sum += row[i]
//   }
//   if (sum == 0) {
//     row[c] = 1
//     sum = 1
//   } else {
//     for (let i = 0; i < row.length; i++) {
//       row[i] = row[i] / sum
//     }
//   }
//   return row
// }

const absolute = (row, c, value) => {
  const oldValue = row.splice(c, 1)[0]
  if (oldValue == 1) {
    for (let i = 0; i < row.length; i++) {
      row.fill((1 - value)/row.length)
    }
  } else {
    for (let i = 0; i < row.length; i++) {
      row[i] = (row[i] / (1 - oldValue)) * (1 - value)
    }
  }
  row.splice(c, 0, value)
  return row
}

const Matrix = class extends Array {
  constructor() {
    super()
  }
  _columns = 0
  setRow(index, array) {
    return this[index] = array
  }

  setColumn(index, array) {
    this.forEach((row, i) => {
      this[i][index] = array[i]
    })
    return this
  }

  getColumn(index){
    let column = []
    for (let i = 0; i < this.length; i++) {
      column[i] = this[i][index]
    }
    return column
  }

  addRow() {
    const row = new Array(this._columns).fill(0)
    return this.push(row)
  }

  addColumn() {
    const first = this._columns === 0
    this.forEach((row, i) => {
      this[i].push(0)
      if (first) this[i][0] = 1
    })
    this._columns += 1
    return this
  }

  _edit(r, c, value){
    const row = absolute(this[r], c, value)
    this[r] = row
    return row
  }

  deleteRow(index) {
    if (this.length > 0) this.splice(index, 1)
    return this
  }

  deleteColumn(index) {
    if (this.length != 0) {
      this.forEach((row, i) => {
        this[i].splice(index, 1)
      })
      this._columns -= 1
    }
    return this
  }
}

export default Matrix