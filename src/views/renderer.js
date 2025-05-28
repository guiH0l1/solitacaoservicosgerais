//console.log("Processo de renderização")

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

function validateCPF() {
    let cpfInput = document.getElementById('inputCpf')
    let cpf = cpfInput.value.replace(/\D/g, '')


    cpfInput.style.border = ""


    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        cpfInput.style.border = "2px solid red"
        return
    }

    let soma = 0, resto


    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf[i - 1]) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf[9])) {
        cpfInput.style.border = "2px solid red"
        return
    }


    soma = 0
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf[i - 1]) * (12 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf[10])) {
        cpfInput.style.border = "2px solid red"
        return
    }


    cpfInput.style.border = ""
}

function resetForm() {
    location.reload()
}
api.resetForm((args) => {
    resetForm()
})


// processo de cadastro do cliente
const foco = document.getElementById('searchEmployee')
// Criar um vetor global para extrair os dados do cliente
let arrayEmployee = []
document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botao adicionar
    btnCreate.disabled = false
    foco.focus()
})

/**
api.dbStatus((event, message) => {
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})*/

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