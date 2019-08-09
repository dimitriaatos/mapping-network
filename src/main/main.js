import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

let mainWindow
let mappingWindow

const isDevelopment = process.env.NODE_ENV !== 'production'

const windowRoute = (window, route) => {
  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${route ? '?route=' + route : ''}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
}

const makeMappingWindow = () => {
  const ontop = new BrowserWindow({
    width: 200,
    height: 200,
    x: 10,
    y: 10,
    show: false,
    frame: true,
    minimizable: false,
    alwaysOnTop: true,
    toolbar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  windowRoute(ontop, 'ontop')
  ontop.on('close', event => {
    event.preventDefault()
    ontop.hide()
    mainWindow.webContents.send('mapmode', false)
    mainWindow.show()
  })
  return ontop
}

const createMainWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 1000,
    title: 'Mapping',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  windowRoute(window)

  window.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('toOntop', (event, mode) => {
    if (mode) {
      mappingWindow.showInactive()
    } else {
      mappingWindow.hide()
    }
  })
  ipcMain.on('fromOntop', () => {
    window.webContents.send('fromOntop')
  })

  return window
}

app.on('ready', () => {
  mainWindow = createMainWindow()
  mappingWindow = makeMappingWindow()
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  (mainWindow === null) && (mainWindow = createMainWindow())
})