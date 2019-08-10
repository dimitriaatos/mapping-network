import Matrix from './matrix'
import { Speed } from './classes'

// TODO: store all last control values and trigger this.value when this.editWeight is triggered.

const getIndex = (query, array) => {
  return query.index ? query.index : array.indexOf(query)
}

const Matrices = class extends Matrix {
  constructor(matrix) {
    super(matrix)
  }
  values = new Matrix()
  columns = {
    add: () => {
      this.addColumn()
      this.values.addColumn()
      return this
    },
    delete: index => {
      this.deleteColumn(index)
      this.values.deleteColumn(index)
      return this
    },
  }
  rows = {
    add: () => {
      const index = this.addRow()
      if (this._columns) this[index - 1][this._columns <= this.length ? this._columns - 1 : this.length -1] = 1
      this.values.addRow()
      return this
    },
    delete: (index) => {
      this.deleteRow(index)
      this.values.deleteRow(index)
      return this
    }
  }
  edit(row, column, value) {
    return this._edit(row, column, value)
  }
  input(index, value, callback) {
    const controlColumn = this.getColumn(index)
    for (let i = 0; i < controlColumn.length; i++) {
      if (controlColumn[i] !== 0) {
        // update values matrix
        this.values[i][index] = controlColumn[i] * value
        let outputValue = 0
        if (false) {
          // let master, slaves = 0
          // for (let j = 0; j < this.values[i].length; j++) {
          //   if (volume.column === i) {
          //     master = this.values[i][j]
          //   } else {
          //     slaves += this.values[i][j]
          //   }
          //   master * (1 + slaves / controlColumn[volume.index])
          // }
        } else {
          for (let j = 0; j < this.values[i].length; j++) {
            outputValue += this.values[i][j]
          }
        }
        callback(i, outputValue)
      }
    }
  }
}

const Axis = class extends Array {
  #weightsAxis
  constructor(weightsAxis){
    super()
    this.#weightsAxis = weightsAxis
  }
  add(item) {
    const init = {
      id: 0,
      value: 0,
      description: '',
      name: '',
      speed: new Speed(),
    }
    this.push({...init, ...item})
    return {weights: this.#weightsAxis.add(), axisData: this}
  }
  delete(item) {
    const index = getIndex(item, this)
    this.splice(index, 1)
    return {weights: this.#weightsAxis.delete(index), axisData: this}
  }
  indexOf(i) {
    return this.findIndex(item => item.id === i.id)
  }
  // changeIndex(item, to) {

  // }
}

const Mapping = class {
  output
  weights = new Matrices()
  controls = new Axis(this.weights.columns)
  parameters = new Axis(this.weights.rows)
  constructor(options){
    Object.assign(this, options)
  }
  input(control, cValue, timeStamp) {
    const cIndex = this.controls.indexOf(control)
    const output = (oIndex, oValue) => {
      this.output(this.parameters[oIndex], oValue)
    }
    this.controls[cIndex].speed.output = speed => {
      this.controls[cIndex].value = speed
      this.weights.input(cIndex, speed, output)
    }
    this.controls[cIndex].speed.input(cValue, timeStamp)
  }
  edit(row, column, value) {
    return this.weights.edit(row, column, value)
  }
  get(target) {
    const all = {
      weights: [...this.weights],
      controls: [...this.controls],
      parameters: [...this.parameters],
    }
    return target ? all[target] : all
  }
  set(newMapping) {
    Object.assign(this, newMapping)
  }
}

window.Matrix = Matrix

export default Mapping
export { Matrices, Axis }