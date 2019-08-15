import React from 'react'
import Cell from './Cell'
import HeaderCell from './HeaderCell'
import { clip } from './../helpers/functions'
import { table, cellSize } from './sty'
import { useDispatch } from 'react-redux'
import IO from './IO'

// import IO from './IO'
import AddButton from './AddButton'
import actions from './../actions'

const Row = props => {
  const dispatch = useDispatch(),
    add = type => dispatch(actions.mapping[type].add())
  return (
    <tr style={{margin: 0, padding: 0}}>
      {
        props.index === 0 && (
          <th
          rowSpan={props.length}
        >
        <div style={{width: cellSize, minHeight: cellSize, position: 'relative'}} >
            <div style={{transform: 'rotate(270deg)', position: 'absolute', bottom: '50%', right: 0}} >
              <IO type="outputs" />
            </div>
        </div>
        </th>
        )
      }
      <th>
        <div style={table.row}>
          <HeaderCell
            type="parameters"
            index={props.index}
            data={props.data}
          />
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
                    props.index,
                    c,
                    clip((initY - event.clientY) * 0.006 + initValue),
                  )
                },
                mouseup = () => {
                  // props.onChangeStop()
                  document.removeEventListener('mousemove', dragging)
                  document.removeEventListener('mouseup', mouseup)
                }
              document.addEventListener('mousemove', dragging)
              document.addEventListener('mouseup', mouseup)
            }}
          />
        ))
      }
      {
        props.index === 0 &&
        <th rowSpan={props.length}>
          <AddButton onClick={add} type="controls" />
        </th>
      }
    </tr>
  )
}

export default Row