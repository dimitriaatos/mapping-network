import state from './state'
import action from './actions'
import {mapmodeUI} from './UIconnections'
import {fromID, toID} from './helpers/midi'
import mapping from './mapping'
import {potentialParameters} from './parameters'
import {ipcRenderer} from 'electron'
import {render} from './weights'

mapmodeUI.addEventListener('change', event => {
  const mode = mapmodeUI.checked

  if (mode) {
    ipcRenderer.send('show-ontop')
    action.mapmode(mode)
  } else {
    const currentState = state.getState()
    let feedback = []
    currentState.io.feedback.onmidimessage = midiMessage => {
      feedback.push(toID(midiMessage.data))
    }
    [...mapping.parameters, ...potentialParameters].forEach(parameter => {
      currentState.io.selected.output.send([...fromID(parameter), 0])
    })
    setTimeout(() => {
      potentialParameters.forEach(parameter => {
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
