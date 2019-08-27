import { app, BrowserWindow } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

let mainWindow

const developmentMode = process.env.NODE_ENV !== 'production'

const loadContents = (window, route) => {
  if (developmentMode) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${route ? '?route=' + route : ''}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }))
  }
}

const createMainWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 1000,
    title: 'Mapping Network',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  loadContents(window)

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

app.on('ready', () => {
  mainWindow = createMainWindow()
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  (mainWindow === null) && (mainWindow = createMainWindow())
})