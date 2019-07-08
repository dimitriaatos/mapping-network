import state from './state'
import action from './actions'
import {inputsUI, outputsUI} from './UIconnections'

const startMIDI = onmidimessage => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const getIO = (type, midiAccess) => Array.from(midiAccess[type].entries()).map(io => io[1])
    const allIOs = {
      inputs: getIO('inputs', midiAccess),
      outputs: getIO('outputs', midiAccess)
    }
    action.io.available(allIOs)

    const makeUI = (ports, element) => {
      ports.forEach((io, index) => {
        const option = document.createElement('option')
        option.value = index
        option.innerHTML = io.name
        element.appendChild(option)
      })
    }
    makeUI(allIOs.inputs, inputsUI)
    makeUI(allIOs.outputs, outputsUI)

    inputs.addEventListener('change', e => {
      action.io.select.input(state.getState().io.available.inputs[e.target.value])
    })

    outputs.addEventListener('change', e => {
      action.io.select.output(state.getState().io.available.outputs[e.target.value])
    })

    action.io.select.input(state.getState().io.available.inputs[0])
    action.io.select.output(state.getState().io.available.outputs[1])
  })
}


export default startMIDI
