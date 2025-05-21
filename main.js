const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })


  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
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



const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N',
        click: () => noteWindow()
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir zoom',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar Zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Recarregar',
        Click: () => updateList()
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Repositorio',
        click: () => shell.openExternal('https://github.com/guiH0l1')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]