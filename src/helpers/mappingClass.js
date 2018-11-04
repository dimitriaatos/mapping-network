import Matrix from './matrix.js'

// TODO: store all last control values and trigger this.value when this.editWeight is triggered.

const bothMatrices = function(callback) {
  [this.weights, this.values].forEach(callback)
}

export default class Mapping {
  constructor(mapping = {}) {
    this.output
    this.values = new Matrix()
    this.weights = new Matrix()
    this.controls = new Array()
    this.parameters = new Array()
    this.mapping = mapping
    this.matrices = bothMatrices.bind(this)
  }
  input(control, value){
    const index = this.controls.indexOf(control)
    const controlColumn = this.weights.getColumn(index)
    for (let i = 0; i < controlColumn.length; i++) {
      this.values[i][index] = controlColumn[i] * value
    }
    console.dir(this.values);
    for (let i = 0; i < controlColumn.length; i++) {
      if (controlColumn[i] != 0) {
        let outputValue = 0
        for (let j = 0; j < this.values[i].length; j++) {
          outputValue += this.values[i][j]
        }
        this.output(this.parameters[i], outputValue)
      }
    }
  }
  addControl(control){
    this.controls.push(control)
    this.matrices((matrix) => {
      matrix.addColumn()
    })
  }
  addParameter(parameter){
    this.parameters.push(parameter)
    this.matrices((matrix) => {
      matrix.addRow()
    })
  }
  deleteControl(control){
    const index = this.controls.indexOf(control)
    this.controls.splice(index, 1)
    this.matrices((matrix) => {
      matrix.deleteColumn(index)
    })
  }
  deleteParameter(parameter){
    const index = this.parameters.indexOf(parameter)
    this.controls.splice(index, 1)
    this.matrices((matrix) => {
      matrix.deleteRow(index)
    })
  }
  edit(row, column, value){
    return this.weights.edit(row, column, value)
  }
  changeControlIndex(control, to){

  }
  changeParameterIndex(parameter, to){

  }
  get mapping() {
    return {
      weights: new Matrix(this.weights),
      controls: [...this.controls],
      parameters: [...this.parameters]
    }
  }
  set mapping(newMapping) {
    Object.assign(this, newMapping)
  }
}
