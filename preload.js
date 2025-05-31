const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    employeeWindow: () => ipcRenderer.send('employee-window'),
    serviceWindow: () => ipcRenderer.send('service-window'),
    aboutExit: () => ipcRenderer.send('about-exit'),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    closeWindow: () => ipcRenderer.send('close-employee-window'),
    dbStatus: (message) => ipcRenderer.on('db-status', message),
    createEmployee: (newEmployee) =>  ipcRenderer.send("create-employee", newEmployee)
})

