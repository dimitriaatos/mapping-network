import React from 'react'
import Cell from './Cell'
import HeaderCell from './HeaderCell'
import { clip } from './../helpers/functions'
import mapping from './../mapping'
import { table, cellSize } from './sty'

import IO from './IO'

const Row = props => {
  return (
    <tr style={{margin: 0, padding: 0}}>
      {
        props.index === 0 &&
        <th
          style={{width: cellSize, minHeight: cellSize, position: 'relative'}}
          rowSpan={props.value.length}
        >
          <div style={{transform: 'rotate(270deg)', position: 'absolute', bottom: '50%', right: 0}} >
            <IO type="outputs" />
          </div>
        </th>}
      <th>
        <div style={table.row}>
          <HeaderCell type="parameter" index={props.index} />
        </div>
      </th>
      {
        props.value.map((cell, c) => (
          <Cell
            key={c}
            index={c}
            value={cell}
            onMouseDown={initY => {
              const initValue = props.value[c],
                dragging = event => {
                  props.onChange(
                      mapping.edit(
                        props.index,
                        c,
                        clip((initY - event.clientY) * 0.006 + initValue),
                      ),
                      props.index
                  )
                },
                mouseup = () => {
                  props.onChangeStop()
                  document.removeEventListener('mousemove', dragging)
                  document.removeEventListener('mouseup', mouseup)
                }
              document.addEventListener('mousemove', dragging)
              document.addEventListener('mouseup', mouseup)
            }}
          />
        ))
      }
    </tr>
  )
}

export default Row