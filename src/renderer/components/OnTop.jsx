import React from 'react'

import Button from '@material-ui/core/Button'
import { ipcRenderer } from 'electron'

const OnTop = () => {
  const map = () => ipcRenderer.send('fromOntop')
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Button variant="contained" onClick={map} >Map</Button>
    </div>
  )
}

export default OnTop