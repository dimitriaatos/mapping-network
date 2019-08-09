import Matrix from './matrix'
import { Speed } from './classes'

// TODO: store all last control values and trigger this.value when this.editWeight is triggered.

const getIndex = (query, array) => {
  return query.index ? query.index : array.indexOf(query)
}

const Matrices = class extends Matrix {
  constructor() {
    super()
  }
  values = new Matrix()
  columns = {
    add: () => {
      this.addColumn()
      this.values.addColumn()
    },
    delete: (index) => {
      this.deleteColumn(index)
      this.values.deleteColumn(index)
    },
  }
  rows = {
    add: () => {
      const index = this.addRow()
      if (this._columns) this[index - 1][this._columns <= this.length ? this._columns - 1 : this.length -1] = 1
      this.values.addRow()
    },
    delete: (index) => {
      this.deleteRow(index)
      this.values.deleteRow(index)
    }
  }
  edit(row, column, value) {
    return this._edit(row, column, value)
  }
  input(index, value, callback) {
    const controlColumn = this.getColumn(index)
    for (let i = 0; i < controlColumn.length; i++) {
      this.values[i][index] = controlColumn[i] * value
    }
    for (let i = 0; i < controlColumn.length; i++) {
      if (controlColumn[i] !== 0) {
        let outputValue = 0
        for (let j = 0; j < this.values[i].length; j++) {
          outputValue += this.values[i][j]
        }
        callback(i, outputValue)
      }
    }
  }
}

const Axis = class extends Array {
  constructor(weightsAxis){
    super()
    this.weightsAxis = weightsAxis
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
    this.weightsAxis.add()
  }
  delete(item) {
    const index = getIndex(item, this)
    this.splice(index, 1)
    this.weightsAxis.delete(index)
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
  constructor(){
    this.controls
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

export default Mapping