const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    clientWindow: () => ipcRenderer.send('client-window'),
    aboutExit: () => ipcRenderer.send('about-exit'),
})