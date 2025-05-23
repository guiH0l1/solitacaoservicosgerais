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

function searchName() {
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
}
// FIM =======================================================================