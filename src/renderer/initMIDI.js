import actions from './actions'
import store from './store'
import { toID } from './helpers/midi'
import { Change } from './helpers/classes'
import mapping from './mapping'

const getIO = midiAccess => (
  ['inputs', 'outputs'].reduce((accum, key) => {
    accum[key] = Array.from(midiAccess[key].entries()).map(io => io[1])
    return accum
  }, {})
)

let midiAccess

const refreshMIDI = () => {
  const IOs = getIO(midiAccess)
  store.dispatch(actions.io.available(IOs))
}

const startMIDI = async () => {
  midiAccess = await navigator.requestMIDIAccess()
  refreshMIDI()
  return !!navigator
}

// TERMINOLOGY
// control: midi input to be mapped
// weight: the factor that scales the value of a control targeted to a specific parameter
// parameter: a parameter on a DAW that is MIDI mappable

// newControl.check(value) returns true if value != previousValue
const newControl = new Change()

const parseMIDI = event => [toID(event.detail), event.detail[2]]

// MIDI INPUT
// add when mapmode in on and map when it's off
document.addEventListener('midiIn', event => {
  const [id, value] = parseMIDI(event),
  state = store.getState(),
  { mapmode } = state,
  parameterIsMapped = mapping.controls.some(item => item.id === id)
  // if the midi id is different than the previous one, and mapmode is on, and the id is not allready mapped
  if (newControl.check(id) && mapmode && !parameterIsMapped){
    // add a new column
    store.dispatch(actions.mapping.controls.add({id}))
    // if the mapmode is off and the midi id is mapped
  } else if (!mapmode && parameterIsMapped) {
    // send a value to the mapper matrix
    mapping.input({id}, value / 127, event.timeStamp)
  }
})

export default startMIDI
export { refreshMIDI }