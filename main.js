const { app, BrowserWindow } = require('electron/main');

const path = require('node:path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.loadFile('./src/views/index.html')
}
app.whenReady().then(createWindow)
