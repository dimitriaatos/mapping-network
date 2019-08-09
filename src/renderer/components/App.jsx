import React from 'react'
import Table from './Table'
import { useSelector } from 'react-redux'
import MapMode from './MapMode'
// import ThemeProvider from '@material-ui/styles/ThemeProvider'
// import theme from './theme'

const App = () => {
  const weights = useSelector(state => state.mapping.weights)
  return (
    <>
      <aside id="controls" style={{
        margin: '40px',
        justifyContent: 'space-around',
        display: 'flex',
        alignItems: 'center',
      }} >
        <MapMode />
      </aside>
      <main id="weights" >
        <Table value={Array.from(weights)} />
      </main>
    </>
  )
}

export default App