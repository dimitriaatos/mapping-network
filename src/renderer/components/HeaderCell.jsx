import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clip } from './../helpers/functions'
import actions from './../actions'
import { table } from './sty'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
// import DragIndicator from '@material-ui/icons/DragIndicator'
// import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'
import ContextMenu from './ContextMenu'
import { makeTitle } from './../helpers/midi'
import { output, input } from './../iofunctions'

const HeaderCell = props => {
    const {id, value} = props.data,
    name = props.data.name || makeTitle({id}).short,
    speedState = props.data.speed.state,
    mapmode = useSelector(state => state.mapmode),
    dispatch = useDispatch(),
    changeName = ({currentTarget: {value}}) => {
      dispatch(actions.mapping[props.type].edit({index: props.index, name: value}))
    },
    remove = () => dispatch(actions.mapping[props.type].delete({index: props.index})),
    [editable, setEditable] = useState(false),
    test = useRef(null),
    changeColor = value => {
      const scaled = (1 - value) * 255
      test.current.style.backgroundColor = `rgb(${[scaled, scaled, scaled]})`
    },
    sendTest = value => {
      props.data.value = value
      const data = [
        props.data,
        value,
        window.performance.now(),
      ]
      ;(props.type === 'controls' ? input : output)(...data)
    },
    testInteraction = mouseDownEvent => {
      const initY = mouseDownEvent.clientY,
        initValue = value,
        dragging = draggingEvent => {
          const value = clip((initY - draggingEvent.clientY) * 0.006 + initValue)
          sendTest(value)
        },
        mouseup = () => {
          props.type === 'parameters' && sendTest(initValue)
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
    
    useEffect(() => {changeColor(props.data.value)}, [props.data.value])
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
          {speedState && <DirectionsRunIcon style={{width: 10, position: 'absolute', top: 0, right: 0}}/>}
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
          <div ref={test} style={table[props.type]}></div>
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
              open={menu}
              type={props.type}
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