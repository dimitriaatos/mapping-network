import { midiParse, fromID, makeTitle } from './midi'
import { Speed } from './classes'

const itemMidi = item => {
  const midi = {}
  midi.midi = midiParse(fromID(item.id))
  midi.description = makeTitle(item).long
  return {...item, ...midi}
}

const newID = (axis, state) => {
  let value = 22528
  while (state[axis].map(item => item.id).includes(value)) {
    value += 1
  }
  return value
}

const findExisting = (itemIn, axis, state) => {
  // if itemIn has a valid index
  if (itemIn.index !== undefined && itemIn.index < state[axis].length) {
    // return the existing item
    return state[axis][itemIn.index]
    // else if there is an id
  } else if (itemIn.id !== undefined) {
    // check if it is already mapped,
    // if it is return the existing item otherwise create a new idex
    const index = state[axis].findIndex(item => item.id == itemIn.id)
    return {index: index === -1 ? state[axis].length : index}
  } else return {index: state[axis].length}
}

const initItem = (itemIn = {}, axis, state) => {

  const foundItem = findExisting(itemIn, axis, state)

  const defaultItem = {
    id: newID(axis, state),
    value: 0,
    description: '',
    name: '',
    speed: new Speed(),
  }

  return itemMidi(Object.assign({}, defaultItem, foundItem, itemIn))
}

const isNote = item => {
  item.midi.type === 0 && (item.value = Math.ceil(item.value))
  return item
}

export { initItem, isNote }