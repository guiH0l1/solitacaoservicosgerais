//console.log("Processo de renderização")

// Criar um vetor global para extrair os dados do cliente
function employee() {
    api.employeeWindow()
}

function service() {
    api.serviceWindow()
}

function backPage() {
    api.closeWindow()
}

function getData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('currentlyData').innerHTML = getData()

//document.getElementById('btnUpdate').disabled = true
api.dbStatus((event, message) => {
    console.log(message)
    if (message === "MongoDB desconectado") {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    }
})


/**api.renderOS((event, dataOS) => {
    console.log(dataOS)
    const os = JSON.parse(dataOS)
    // preencher os campos com os dados da OS
    idOS.value = os._id
    // formatar data:
    const data = new Date(os.dataEntrada)
    const formatada = data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
    dateOS.value = formatada
    idClient.value = os.idCliente
    // disparar ação de busca do cliente
    idClient.dispatchEvent(new Event('change'))
    statusOS.value = os.statusOS
    computer.value = os.computador
    serial.value = os.serie
    problem.value = os.problema
    obs.value = os.observacao
    specialist.value = os.tecnico
    diagnosis.value = os.diagnostico
    parts.value = os.pecas
    total.value = os.valor
    // desativar o botão adicionar
    btnCreate.disabled = true
    // ativar os botões editar e excluir
    btnUpdate.disabled = false
    btnDelete.disabled = false    
})
*/