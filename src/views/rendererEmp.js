function backPage() {
    api.closeWindow()
}

// processo de cadastro do cliente


const foco = document.getElementById('searchEmployee')
let arrayEmployee = []

document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botao adicionar
    btnCreate.disabled = false
    foco.focus()
})

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

let create = document.getElementById('btnCreate')


// == captura de dados
let formEmp = document.getElementById('formEmployee')
let nomeFunc = document.getElementById('inputNome')
let cpf = document.getElementById('inputCpf')
let cargo = document.getElementById('inputSector')
let email = document.getElementById('inputEmail')
let tel = document.getElementById('inputTelefone')
let uni = document.getElementById('inputUn')
let idEmp = document.getElementById('inputIdEmployee')


// PROCESSO DE CADASTRO
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
        if (idEmp.value === '') {
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
        } else {
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

//PROCESSO DE BUSCA

function searchName() {
    const input = document.getElementById('searchEmployee').value.trim();
    if (input === '')
        return;

    const isCpf = /^\d{11}$/.test(input.replace(/\D/g, ''));
    if (isCpf) {
        api.searchByCpf(input)
    } else {
        api.searchByName(input)
    }


}

api.onSearchResult((event, result) => {
    const c = result.employee
    console.log('Funcionário retornado:', c)

    document.getElementById('inputNome').value = nome
    document.getElementById('inputCpf').value = cpf
    document.getElementById('inputSector').value = cargo
    document.getElementById('inputEmail').value = email
    document.getElementById('inputTelefone').value = telefone
    document.getElementById('inputUn').value = unidade


    /*
    idEmp.value = c.id
    nome.value = c.nome
    cpf.value = c.cpf
    cargo.value = c.cargo
    email.value = c.email
    tel.value = c.telefone
    uni.value = c.uni
    */

    document.getElementById('btnCreate').disabled = true
    document.getElementById('btnUpdate').disabled = false
    document.getElementById('btnDelete').disabled = false
})


/**
 * 
api.setCpf((args) => {
    console.log("teste do IPC 'set-cpf'")
    let buscaCpf = document.getElementById('searchEmployee').value
    nome.focus()
    foco.value = ""
    cpf.value = buscaCpf
    restaurarEnter()
}) */