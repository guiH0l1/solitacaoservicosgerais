const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('./src/views/index.html')
}



// Abre uma nova janela ao clicar no botão
ipcMain.on('client-window', () => {
  const clientWin = new BrowserWindow({
    width: 600,
    height: 400
  })

  clientWin.loadFile('./src/views/employee.html')
})

app.whenReady().then(createWindow)
