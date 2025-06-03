//console.log("Processo de renderização")

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

//document.getElementById('btnUpdate').disabled = true
let create = document.getElementById('btnCreate')

api.dbStatus((event, message) => {
    console.log(message)
    if (message === "MongoDB desconectado") {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    }
})

// == captura de dados
let formEmp = document.getElementById('formEmployee')
let nome = document.getElementById('inputNome')
let cpf = document.getElementById('inputCpf')
let cargo = document.getElementById('inputSector')
let email = document.getElementById('inputEmail')
let tel = document.getElementById('inputTelefone')
let uni = document.getElementById('inputUn')
let idEmp = document.getElementById('inputIdEmployee')


document.addEventListener('DOMContentLoaded', () => {
formEmp.addEventListener('submit', async (event) => {
    // evitar comportamento padrão de recarregar a página
    console.log("teste")
    event.preventDefault()
    console.log(
        idEmp.value,
        nome.value,
        cpf.value,
        cargo.value,
        email.value,
        tel.value,
        uni.value
        
    )
    // Estrategia para usar o submit para cadastrar um novo cliente ou editar os dados de um cliente existente
    // Verificar se existe o id do cliente
    if (idEmp.value === ''){
        // cadastrar um novo cliente
        const newEmployee = {
            nomeEmp: nome.value,
            cpfEmp: cpf.value,
            cargoEmp: cargo.value,
            emailEmp: email.value,
            telEmp: tel.value,
            uniEmp: uni.value
        }
        // Enviar ao main
        api.createEmployee(newEmployee)
    }else{
        // Alterar os dados de um cliente existente
        // Teste de validação do id
        //console.log(idClient.value)
        // Editar um cliente existente
        const employee = {
            idEmp: idEmp.value,
            nomeEmp: nome.value,
            cpfEmp: cpf.value,
            cargoEmp: cargo.value,
            emailEmp: email.value,
            telEmp: tel.value,
            uniEmp: uni.value
        }
        // Enviar ao main o objeto cliente Passo - 2
        api.updateEmployee(employee)
    }
})
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