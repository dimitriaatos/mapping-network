import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const AddButton = props => {
  return (
    <IconButton onClick={() => props.onClick(props.type)}>
      <AddCircleIcon/>
    </IconButton>
  )
}

export default AddButton