const isUndefined = val => val === undefined

export default class Matrix {
  constructor() {
    this.matrix = new Array()
  }

  getColumn(index) {
    if (!isUndefined(index)) {
      return this.matrix[index]
    } else {
      throw new Error('The column index has to be specified \n')
    }
  }

  getRow(index) {
    if (!isUndefined(index)) {
      return this.matrix.map(row => row[index])
    } else {
      throw new Error('The row index has to be specified \n')
    }
  }

  setColumn(index, array) {
    if (isUndefined(index)) {
      throw new Error('The column index has to be specified \n')
    } else if (isUndefined(array)) {
      throw new Error('A new column has to be specified \n')
    } else if (array.length != this.size[1] && this.size[1] != 0) {
      throw new Error(`You are trying to add a column of size ${array.length} to a ${this.size} matrix. \n`)
    } else {
      this.matrix[index] = array
    }
    return this
  }

  setRow(index, array) {
    if (isUndefined(index)) {
      throw new Error('The row index has to be specified \n')
    } else if (isUndefined(array)) {
      throw new Error('A new row has to be specified \n')
    } else if (array.length != this.size[0] && this.size[0] != 0) {
      throw new Error(`You are trying to add a row of size ${array.length} to a ${this.size} matrix. \n`)
    } else {
      this.matrix.forEach((column, i) => {
        column[index] = array[i]
      })
    }
    return this
  }

  insertColumn(index, array) {
    this.matrix.splice(index, 0, new Array(this.size[0]))
    this.matrix[index].fill(0)
    if (array) this.setColumn(index, array)
    return this
  }

  insertRow(index, array) {
    if (this.matrix != null) {
      this.matrix.forEach(column => {
        column.splice(index, 0, 0)
      })
      if (array) this.setRow(index, array)
      return this
    }
  }

  get size() {
    return [!isUndefined(this.matrix[0]) ? this.matrix[0].length : 0, this.matrix.length]
  }

  deleteColumn(index) {
    this.matrix.splice(index, 1)
    return this
  }

  deleteRow(index) {
    this.matrix.forEach(column => {
      column.splice(index, 1)
    })
    return this
  }
}
