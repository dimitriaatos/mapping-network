const relative = (row, c, value) => {
  row[c] = value
  let sum = 0
  for (let i = 0; i < row.length; i++) {
    sum += row[i]
  }
  if (sum == 0) {
    row[c] = 1
    sum = 1
  } else {
    for (let i = 0; i < row.length; i++) {
      row[i] = row[i] / sum
    }
  }
  return row
}

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

export default class Matrix extends Array {
  constructor(matrix = []) {
    super(...matrix)
    this._columns = matrix._columns || 0
  }

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
    let row = new Array(this._columns).fill(0)
    row[this._columns <= this.length ? this._columns -1 : this.length] = 1
    this.push(row)
    return this
  }

  addColumn() {
    this.forEach((row, i) => {
      this[i].push(0)
    })
    this._columns += 1
    return this
  }

  edit(r, c, value){
    // absolute(this[r], c, value)
    const row = absolute(this[r], c, value)
    this[r] = row
    return row
  }

  deleteRow(index) {
    if (this.length > 0) {
      this.splice(index, 1)
    }
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
