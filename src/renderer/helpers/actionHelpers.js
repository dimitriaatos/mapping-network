import { midiParse, fromID, makeTitle } from './midi'
import { Speed } from './classes'

const itemMidi = item => {
  const midi = {}
  midi.midi = midiParse(fromID(item.id))
  midi.description = makeTitle(item).long
  return midi
}

const newID = (axis, state) => {
  let value = 22528
  while (state[axis].map(item => item.id).includes(value)) {
    value += 1
  }
  return value
}

const initItem = (itemIn, axis, state) => {
  const item = {
    id: newID(axis, state),
    index: state[axis].length,
    value: 0,
    description: '',
    name: '',
    speed: new Speed(),
  }
  Object.assign(item, itemIn)
  Object.assign(item, itemMidi(item))
  return item
}

export { initItem }