import state from './state.js'
import {Change} from './helpers/classes.js'
import {toID, midiParse} from './helpers/midi.js'
import mapping from './mapping.js'
import action from './actions.js'
import './UIfunction.js'

import connectController from './controllers.js'
import {render, connectWeights} from './weights.js'

const newControl = new Change()

document.addEventListener('midiIN', (event) => {
  const id = toID(event.detail)
  const value = event.detail[2]
  const currentState = state.getState()
  if (newControl.check(id) && currentState.mapmode && !mapping.controls.includes(id)){
    mapping.addControl(id)
    render()
    action.mapping()
  }
  if (!currentState.mapmode && mapping.controls.includes(id)) {
    mapping.input(id, value / 127)
  }
})

const weightIn = (r, c, value) => {
  return mapping.edit(r, c, value)
}

const newParameter = new Change()
const parameterIn = (id) => {
  if (newParameter.check(id) && currentState.mapmode && !mapping.parameters.includes(id)) {
    mapping.addParameter(id)
  }
}

connectController()
connectWeights(weightIn)
// connectParameters(parameterIn)

// connectGUI()
//
// test init
// for (let i = 0; i < 2; i++) {
//   mapping.addControl(toID([176, i]))
// }
//
// for (let i = 0; i < 2; i++) {
//   mapping.addParameter(toID([176, i]))
// }

// render()
// const currentState = state.getState()
// console.dir(currentState.input);
