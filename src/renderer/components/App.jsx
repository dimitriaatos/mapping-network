import React from 'react'
import Table from './Table'
import MapMode from './MapMode'
// import ThemeProvider from '@material-ui/styles/ThemeProvider'
// import theme from './theme'

const App = () => {
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
        <Table/>
      </main>
    </>
  )
}

export default App