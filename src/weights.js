import mapping from './mapping.js'
import action from './actions.js'
import {weightsUI} from './UIconnections.js'

const grayscale = brightness => `rgb(${[brightness, brightness, brightness]})`

// TODO: on mapmode pass midi messages through, from the controller to the DAW.
//       That way a one-by-one matrix is made.

let table;
let callback;
let saveCallback;

const clicking = (rowElement, r, c) => {
  return (event) => {
    const initY = event.clientY
    const weight = mapping.weights[r][c]
    const dragging = event => {
      let value = (initY - event.clientY) * 0.006 + weight
      value = value > 1 ? 1 : value < 0 ? 0 : value
      const newColumn = callback(r, c, value)
      rowElement.childNodes.forEach((item, i) => {
        item.style.backgroundColor = grayscale(255 - newColumn[i] * 255)
      })
    }
    document.addEventListener('mousemove', dragging)
    const mouseup = event => {
      action.mapping()
      document.removeEventListener('mousemove', dragging)
      document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mouseup', mouseup)
  }
}

const render = () => {
  table.innerHTML = ''
  mapping.weights.forEach((row, r) => {
    const rowElement = document.createElement('tr')
    row.forEach((cell, c) => {
      const item = document.createElement('th')
      item.style.backgroundColor = grayscale(255 - mapping.weights[r][c] * 255)
      item.onmousedown = clicking(rowElement, r, c)

      rowElement.appendChild(item)
    })
    table.appendChild(rowElement)
  })
}

const connectWeights = (cb) => {
  callback = cb
  weightsUI.innerHTML = ''
  table = document.createElement('table')
  render()
  weightsUI.appendChild(table)
}

export {connectWeights, render}
