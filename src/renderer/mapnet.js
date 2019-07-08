import state from './state'
import {Change} from './helpers/classes'
import {toID, midiParse} from './helpers/midi'
import mapMatrix from './mapping'
import action from './actions'
import './UIfunction'

import connectController from './controllers'
import {render, connectWeights} from './weights'

// TERMINOLOGY
// control: midi input to be mapped
// weight: the factor that scales the value of a control targeted to a specific parameter
// parameter: a parameter on a DAW that is MIDI mappable

// newControl.check(value) returns true if value != previousValue
const newControl = new Change()

const parseMIDI = event => [toID(event.detail), value = event.detail[2]]

// MIDI INPUT
// add when mapmode in on and map when it's off
document.addEventListener('midiIN', event => {
  const [id, value] = parseMIDI(),
  {mapmode} = state.getState()
  // if the midi id is different than the previous one, and mapmode is on, and the id is not allready mapped
  if (newControl.check(id) && mapmode && !mapMatrix.controls.includes(id)){
    // add a new column
      mapMatrix.addControl(id)
    // update UI
      render()
    // and ?
      action.mapping()
    }
  // if the mapmode is off and the midi id is mapped
  if (!mapmode && mapMatrix.controls.includes(id)) {
    // send a value to the mapper matrix
      mapMatrix.input(id, value / 127)
    }
  })

const weightIn = (r, c, value) => {
  return mapMatrix.edit(r, c, value)
}

const newParameter = new Change()
const parameterIn = id => {
  if (newParameter.check(id) && currentState.mapmode && !mapMatrix.parameters.includes(id)) {
    mapMatrix.addParameter(id)
  }
}

connectController()
connectWeights(weightIn)
// connectParameters(parameterIn)

// connectGUI()
//
// test init
// for (let i = 0; i < 2; i++) {
//   mapMatrix.addControl(toID([176, i]))
// }
//
// for (let i = 0; i < 2; i++) {
//   mapMatrix.addParameter(toID([176, i]))
// }

// render()
// const currentState = state.getState()
// console.dir(currentState.input);
