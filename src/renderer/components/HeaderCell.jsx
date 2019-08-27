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
import { isNote } from '../helpers/actionHelpers'

const HeaderCell = props => {
  
    // Data: id, value, name, speedState, mapmode
    const {id, value} = props.data,
      name = props.data.name,
      speedState = props.data.speed.state,
      mapmode = useSelector(state => state.mapmode.global)

    // Dispatch
    const dispatch = useDispatch()

    // State: editable, menu
    const [editable, setEditable] = useState(false),
    [menu, setMenu] = useState(false)

    // Refs: 
    const testPrevObj = useRef(null)

    // Actions: changeName, remove, test, handleMouseDown
    const changeName = ({currentTarget: {value}}) => {
        dispatch(actions.mapping[props.type].edit({index: props.index, name: value}))
      },
      blur = event => event.keyCode === 27 || event.keyCode === 13 && event.target.blur(), //Esc & Enter

      remove = () => dispatch(actions.mapping[props.type].delete({index: props.index})),
      test = value => {
        props.data.value = value
        const data = [
          isNote(props.data),
          window.performance.now(),
        ]
        ;(props.type === 'controls' ? input : output)(...data)
      },
      handleMouseDown = mouseDownEvent => {
        const initY = mouseDownEvent.clientY,
          initValue = value,
          dragging = draggingEvent => {
            const value = clip((initY - draggingEvent.clientY) * 0.006 + initValue)
            test(value)
          },
          mouseup = () => {
            props.type === 'parameters' && test(initValue)
            document.body.style.cursor = 'default'
            document.removeEventListener('mousemove', dragging)
            document.removeEventListener('mouseup', mouseup)
          }
        // test(initValue)
        document.body.style.cursor = 'ns-resize'
        document.addEventListener('mousemove', dragging)
        document.addEventListener('mouseup', mouseup)
      },
      controlMenu = event => {
        event.preventDefault()
        setMenu(true)
      }
    
    // Change color
    useEffect(() => {
      const scaled = (1 - props.data.value) * 255
      testPrevObj.current.style.backgroundColor = `rgb(${[scaled, scaled, scaled]})`
    }, [props.data.value])
  return (
    <>
      {/* <Tooltip
        title={description}
        placement={props.type === 'control' ? 'top' : 'top'}
        enterDelay={800}
      > */}
        <div
          style={
            {...table.nameContainer, backgroundColor: menu ? 'grey' : 'white',
            '&:hover': {backgroundColor: 'grey'}}
          }
          onDoubleClick={() => setEditable(true)}
          onMouseDown={handleMouseDown}
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
            <span style={table.name} >{name || makeTitle({id}).short}</span>
          }
          <div ref={testPrevObj} style={table[props.type]}></div>
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
            anchorEl={testPrevObj.current}
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