import store from './store'
import actions from './actions'
import { fromID } from './helpers/midi'

const findByID = (array, item) => {
  return item.index !== undefined ?
    array[item.index] :
    array.find(i => i.id === item.id)
}

const input = (item, timeStamp) => {
  const state = store.getState()
  item = findByID(state.mapping.controls, item)

  item.speed.output = speed => {
    item.value = speed
    store.dispatch(actions.mapping.input(item))
  }

  item.speed.input(item.value, timeStamp)
}

const output = item => {
  store.getState().io.selected.outputs.send(
    [...fromID(item.id), Math.round(item.value * 127)]
  )
}

export {input, output}