import store from './store'
import appActions from './appActions'
import { pureOutput } from './iofunctions'
import matrix from './helpers/matrixFunctions'
import { initItem } from './helpers/actionHelpers'
import { addSpeed } from './helpers/functions'

const change = axis => ['add', 'delete'].reduce((accum, act) => {
  accum[act] = item => {
    const typeBool = act === 'add'
    const isControl = axis === 'controls' && !typeBool
    const state = store.getState().mapping
    const inItem = initItem(item, axis, state)
  
    // edit io item arrays
    if (typeBool) {
      state[axis].splice(inItem.index, 0, inItem)
    }
    else {
      state[axis].splice(inItem.index, 1)
    }
    state[axis] = state[axis].map((item, index) => ({...item, index}))

    if (isControl) state.weights = state.weights.map((row, r) => {
      return matrix.edit(state.weights, r, inItem.index, 0)
    })

    const [weights, columns] = matrix[axis][act](state.weights, state.columns, inItem.index, true)
    const [values] = matrix[axis][act](state.values, state.columns, inItem.index)

    if (isControl) {
      values.forEach((row, r) => {
        values[r] = state.controls.map(
          (item, index) => item.value * weights[r][index]
        )
        state.parameters[r].value = matrix.output.add(values, r)
        pureOutput(state.parameters[r])
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
        item: initItem(item, axis, store.getState().mapping),
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

const input = item => {

  const {index, value} = item
  const {weights, values, controls, parameters} = store.getState().mapping

  // column of weights for the given controls
  const controlWeights = matrix.controls.get(weights, index)

  controls[index] = item

  // for every non zero weight
  for (let i = 0; i < controlWeights.length; i++) {
    if (controlWeights[i] !== 0) {
      values[i][index] = controlWeights[i] * value
      let outputValue = 0
      // calculate output value
      outputValue = matrix.output.add(values, i)

      // if output is a MIDI Note make its value boolean
      outputValue = parameters[i].midi.type === 0 ?
        Math.ceil(outputValue) :
        outputValue

      // trigger output only of the value is changed
      if (parameters[i].value !== outputValue) {
        parameters[i].value = outputValue
        pureOutput(parameters[i])
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

const output = item => {
  return {
    type: 'OUTPUT',
    item,
  }
}

const open = ({data, filePath}) => {
  return {
    type: 'OPEN',
    data: addSpeed(data),
    filePath,
  }
}

const actions = {
  open,
  mapping: {
    input,
    output,
    ...axisEdit,
    edit,
  },
  ...appActions,
}

export default actions