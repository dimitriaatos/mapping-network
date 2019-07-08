import state from './state'
import mapping from './mapping'

const mapmode = (mode) => {
  // if (action.mode) {
  //
  // } else {
  //   mapping.parameters.forEach((parameter, index) => {
  //     mapping.output(parameter, 0)
  //   })
  // }
  state.dispatch({
    type: 'MAP_MODE',
    mode
  })
}

const input = (input) => {
  const currentState = state.getState()
  currentState.io.selected.input.onmidimessage = undefined
  input.onmidimessage = (midiMessage) => {
    document.dispatchEvent(new CustomEvent('midiIN', {detail: midiMessage.data}))
  }
  state.dispatch({
    type: 'IO::SELECT_INPUT',
    input
  })
}

const output = (output) => {
  state.dispatch({
    type: 'IO::SELECT_OUTPUT',
    output
  })
}

const available = (io) => {
  state.dispatch({
    type: 'IO::AVAILABLE',
    io
  })
}

const savemapping = () => {
  state.dispatch({
    type: 'MAPPING',
    mapping: mapping.mapping
  })
}

const action = {mapmode, io: {available, select: {input, output}}, mapping: savemapping}
export default action
