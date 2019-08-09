import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { plural, clip } from '../helpers/functions'
import actions from '../actions'
import mapping from './../mapping'
import { table } from './sty'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
// import DragIndicator from '@material-ui/icons/DragIndicator'
// import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'
import ContextMenu from './ContextMenu'

const HeaderCell = props => {
  const types = plural(props.type),
    name = useSelector(state => state.mapping[types][props.index].name),
    // description = useSelector(state => state.mapping[types][props.index].description),
    mapmode = useSelector(state => state.mapmode),
    dispatch = useDispatch(),
    changeName = ({currentTarget: {value}}) => {
      dispatch(actions.mapping.rename({axis: plural(props.type), index: props.index, value}))
    },
    remove = () => dispatch(actions.mapping[types].delete(props.index)),
    [editable, setEditable] = useState(false),
    test = useRef(null),
    sendTest = value => {
      const scaled = (1 - value) * 255
      test.current.style.backgroundColor = `rgb(${[scaled, scaled, scaled]})`
      mapping[props.type === 'control' ? 'input' : 'output'](
        {id: mapping[plural(props.type)][props.index].id},
        value,
        window.performance.now(),
      )
    },
    testInteraction = mouseDownEvent => {
      const initY = mouseDownEvent.clientY,
        initValue = props.type == 'control' ? mapping.controls[props.index].value : 0.5,
        dragging = draggingEvent => {
          const value = clip((initY - draggingEvent.clientY) * 0.006 + initValue)
          sendTest(value)
        },
        mouseup = () => {
          // sendTest(initValue)
          // test.current.style.backgroundColor = 'white'
          document.body.style.cursor = 'default'
          document.removeEventListener('mousemove', dragging)
          document.removeEventListener('mouseup', mouseup)
        }
      sendTest(initValue)
      document.body.style.cursor = 'ns-resize'
      document.addEventListener('mousemove', dragging)
      document.addEventListener('mouseup', mouseup)
    },
    blur = event => event.keyCode === 27 && event.target.blur(), //Esc
    [menu, setMenu] = useState(false),
    controlMenu = event => {
      event.preventDefault()
      setMenu(true)
    }
  return (
    <>
      {/* <Tooltip
        title={description}
        placement={props.type === 'control' ? 'top' : 'top'}
        enterDelay={800}
      > */}
        <div
          style={{...table.nameContainer, backgroundColor: menu ? 'grey' : 'white'}}
          onDoubleClick={() => setEditable(true)}
          onMouseDown={testInteraction}
          onContextMenu={controlMenu}
        >
          {
            editable ?
            <input
              style={table.name}
              onBlur={() => setEditable(false)}
              type="text"
              value={name}
              onChange={changeName}
              autoFocus={true}
              onKeyDown={blur}
            /> :
            <span style={table.name} >{name}</span>
          }
          <div ref={test} style={table[types]}></div>
          <Popover 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={menu}
            onClose={() => setMenu(false)}
            anchorEl={test.current}
          >
            <ContextMenu
              type={types}
              index={props.index}
            />
          </Popover>
        </div>
      {/* </Tooltip> */}
      {mapmode && (
        <div style={table.deleteContainer}>
          <IconButton onClick={remove} aria-label="Delete" >
            <CloseIcon />
          </IconButton>
          {/* <DragIndicator /> */}
        </div>
      )}
    </>
  )
}

export default HeaderCell