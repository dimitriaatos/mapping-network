import React from 'react'
import { cellSize } from './sty'

const Cell = props => {
  const grayscale = brightness => `rgb(${[brightness, brightness, brightness]})`
  return (
    <td
      style={{
        backgroundColor: grayscale(255 - props.value * 255),
        width: cellSize,
        height: cellSize,
        margin: 0,
        padding: 0,
      }}
      onMouseDown={({clientY}) => {
        props.onMouseDown(clientY)
      }}
    ></td>
  )
}

export default Cell