const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')
const { conectar, desconectar } = require('./database.js')
const employeeModel = require('./src/models/employee.js')

/**
app.whenReady().then(async () => {
  const status = await conectar()
  console.log('Status da conexão:', status)

  if (status === 'conectado') {
    await testConnection()  // 👈 CHAMADA AQUI
  }

  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('db-status', status)
    })
  }
}) */


/** 
app.whenReady().then(async () => {
  const status = await conectar()

  // Envia status de conexão para o renderer
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('db-status', status)
    })
  }
})*/



app.whenReady().then(async () => {
  const status = await conectar();

  // Envia status de conexão para o renderer
  const mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('db-status', status);
    });
  }
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', async () => {
  await desconectar()
})

app.commandLine.appendSwitch('log-level', '3')


function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 550,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })


  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  win.loadFile('./src/views/index.html')

}


let employee
function employeeWindow() {
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    employee = new BrowserWindow({
      width: 1080,
      height: 980,
      //autoHideMenuBar: true,
      //resizable: false,
      parent: main,
      modal: true,
      center: true,
      //ativação do preload.js
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  employee.loadFile('./src/views/employee.html')
}
 
ipcMain.on('employee-window', () => {
  employeeWindow()
})


let service
function serviceWindow() {
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    service = new BrowserWindow({
      width: 1080,
      height: 980,
      //autoHideMenuBar: true,
      //resizable: false,
      parent: main,
      modal: true,
      center: true,
      //ativação do preload.js
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  service.loadFile('./src/views/service.html')


}

ipcMain.on('service-window', () => {
  serviceWindow()
})

app.whenReady().then(createWindow)

let about
function aboutWindow() {
  const mainWindow = BrowserWindow.getFocusedWindow()

  if (mainWindow) {
    about = new BrowserWindow({
      width: 415,
      height: 350,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: mainWindow,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, './preload.js')
      }
    })
  }

  about.loadFile('./src/views/about.html')

  ipcMain.on('about-exit', () => {
    if (about && !about.isDestroyed()) {
      about.close()
    }

  })
}

ipcMain.on('close-employee-window', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.close()
  }
})

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
    label: 'Relatório',
    submenu: [
      {
        label: 'Clientes',
        click: () => relatorioClientes()
      },
      {
        label: 'OS abertas',
        click: () => OSAbertas()
      },
      {
        label: 'OS finalizadas',
        click: () => OSFinalizadas()
      },
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
        role: 'reload'
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


// == Processo CRUD =====================================================
// ======================================================================



ipcMain.on('create-employee', async (event, newEmployee) => {
  try {
    const employee = new Employee({
      nome: newEmployee.nomeEmp,
      cpf: newEmployee.cpfEmp,
      cargo: newEmployee.cargoEmp,
      email: newEmployee.emailEmp,
      telefone: newEmployee.telEmp,
      unidade: newEmployee.uniEmp,
    });

    await employee.save();

    console.log('Funcionário salvo com sucesso!');
    // Pode enviar uma resposta pro renderer se quiser
    event.reply('employee-created', { success: true });
  } catch (error) {
    console.error('Erro ao salvar funcionário:', error);
    event.reply('employee-created', { success: false, error: error.message });
  }
})




/** 
ipcMain.on('create-employee', async (event, newEmployee) => {
  console.log('Dados recebidos no main:', newEmployee)
  try {
    const employee = new employeeModel({
      nome: newEmployee.nomeEmp,
      cpf: newEmployee.cpfEmp,
      cargo: newEmployee.cargoEmp,
      email: newEmployee.emailEmp,
      telefone: newEmployee.telEmp,
      unidade: newEmployee.uniEmp
    });
    await employee.save();
    dialog.showMessageBox({
      type: 'info',
      title: "Aviso",
      message: "Funcionário adicionado com sucesso.",
      buttons: ['OK']
    }).then((result) => {
      if (result.response === 0) {
        event.reply('reset-form');
      }
    });
  } catch (error) {
    console.error('Erro ao salvar funcionário:', error);
  }
})*/


/**function searchName() {
  let input = document.getElementById('searchCliente').value.trim()
  console.log(input)

  if (input === "") {
      api.validateSearch()
      return
  }

  // Verifica se é CPF (somente números e 11 dígitos)
  let isCpf = /^\d{11}$/.test(input.replace(/\D/g, ''))

  if (isCpf) {
      // Buscar por CPF
      api.buscarCpf(input)
  } else {
      // Buscar por nome
      api.searchName(input)
  }

  api.renderClient((event, client) => {
      const clientData = JSON.parse(client)
      arrayClient = clientData
      // Uso do forEach para percorrer o vetor
      arrayClient.forEach((c) => {
          idClient.value = c._id
          nome.value = c.nome
          sexo.value = c.sexo
          cpf.value = c.cpf
          email.value = c.email
          tel.value = c.telefone
          cep.value = c.cep
          logradouro.value = c.logradouro
          numero.value = c.numero
          complemento.value = c.complemento
          bairro.value = c.bairro
          cidade.value = c.cidade
          uf.value = c.uf
          restaurarEnter()
          //desativar o botão adicionar
          btnCreate.disabled = true
          // ativar e desativar o botão editar e excluir
          btnUpdate.disabled = false
          btnDelete.disabled = false
      })

  })
}*/
// FIM =======================================================================