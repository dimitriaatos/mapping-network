import state from './state.js'
import action from './actions.js'
import {mapmodeUI} from './UIconnections.js'
import {fromID, toID} from './helpers/midi.js'
import mapping from './mapping.js'
import {potentialParameters} from './parameters.js'
const ipcRenderer = require('electron').ipcRenderer
import {render} from './weights.js'

mapmodeUI.addEventListener('change', (event) => {
  const mode = mapmodeUI.checked

  if (mode) {
    ipcRenderer.send('show-ontop')
    action.mapmode(mode)
  } else {
    const currentState = state.getState()
    let feedback = []
    currentState.io.feedback.onmidimessage = (midiMessage) => {
      feedback.push(toID(midiMessage.data))
    }
    [...mapping.parameters, ...potentialParameters].forEach((parameter) => {
      currentState.io.selected.output.send([...fromID(parameter), 0])
    })
    setTimeout(() => {
      potentialParameters.forEach((parameter) => {
        if (feedback.includes(parameter)) {
          if (!mapping.parameters.includes(parameter)) {
            mapping.addParameter(parameter)
          }
        } else {
          mapping.deleteParameter(parameter)
        }
      })
      // currentState.io.feedback.onmidimessage = undefined
      action.mapmode(mode)
      action.mapping()
      render()
    }, 500)
  }
})
