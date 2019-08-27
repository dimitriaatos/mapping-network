import store from './store'
import actions from './actions'
import { fromID } from './helpers/midi'

const findByID = (array, item) => {
  return item.index !== undefined ?
    array[item.index] :
    array.find(i => i.id === item.id)
}

const input = (itemIn, timeStamp) => {
  const state = store.getState()
  const item = findByID(state.mapping.controls, itemIn)
  item.value = itemIn.value

  item.speed.output = (speed, time) => {
    item.value = speed
    store.dispatch(actions.mapping.input(item))
  }

  item.speed.input(item.value, timeStamp)
}

const pureOutput = item => {
  store.getState().io.selected.outputs.send(
    [...fromID(item.id), Math.round(item.value * 127)]
  )
}

const output = item => {
  pureOutput(item)
  store.dispatch(actions.mapping.output(item))
}

export {input, output, pureOutput}