import store from './store'
import appActions from './appActions'
import { output } from './iofunctions'
import matrix from './helpers/matrixFunctions'
import { initItem } from './helpers/actionHelpers'

const change = axis => ['add', 'delete'].reduce((accum, act) => {
  accum[act] = item => {
    const typeBool = act === 'add'
    const isControl = axis === 'controls' && !typeBool
    const state = store.getState().mapping
    const inItem = initItem(item, axis, state)
    
    if (isControl) state.weights = state.weights.map((row, r) => {
      return matrix.edit(state.weights, r, inItem.index, 0)
    })
  
    typeBool ? state[axis].splice(inItem.index, 0, inItem) :
    state[axis].splice(inItem.index, 1)
    const [weights, columns] = matrix[axis][act](state.weights, state.columns, true)
    const [values] = matrix[axis][act](state.values, state.columns)

    if (isControl) {
      values.forEach((row, r) => {
        values[r] = state.controls.map(
          (item, index) => item.value * weights[r][index]
        )
        state.parameters[r].value = matrix.output.add(values, r)
        output(state.parameters[r])
      })
    }

    return {
      type: typeBool ? 'MAPPING::ADD' : 'MAPPING::DELETE',
      weights,
      values,
      columns,
      axis,
      [axis]: [...state[axis]]
    }
  }
  return accum
}, {})

const axisEdit = ['parameters', 'controls'].reduce((accum, axis) => {
  accum[axis] = {
    ...change(axis),
    edit: item => {
      return {
        type: 'MAPPING::EDIT',
        item,
        axis,
      }
    },
  }
  return accum
}, {})

const edit = (r, c, value) => {
  const {weights, values, controls, parameters} = store.getState().mapping
  weights[r] = matrix.edit(weights, r, c, value)
  values[r] = controls.map(
    (item, index) => item.value * weights[r][index]
  )
  parameters[r].value = matrix.output.add(values, r)
  output(parameters[r])
  return {
    type: 'MAPPING',
    weights,
    values,
    controls,
  }
}

const inputAction = item => {
  const {index, value} = item
  const isNote = item.midi.type === 0
  const {weights, values, controls, parameters} = store.getState().mapping
  const controlColumn = matrix.controls.get(weights, index)
  controls[index] = item
  for (let i = 0; i < controlColumn.length; i++) {
    if (controlColumn[i] !== 0) {
      values[i][index] = controlColumn[i] * value
      let outputValue = 0
      outputValue = matrix.output.add(values, i)
      outputValue = isNote ? Math.ceil(outputValue) : outputValue
      if (parameters[i].value !== outputValue) {
        parameters[i].value = outputValue
        output(parameters[i])
      }
    }
  }

  return {
    type: 'INPUT',
    controls,
    parameters,
    values,
  }
}

const actions = {
  mapping: {
    input: inputAction,
    ...axisEdit,
    edit,
  },
  ...appActions,
}

export default actions