//console.log("Processo de renderização")

function employee() {
  location.href = './employee.html'
}

function service() {
    location.href = './service.html'
  }


/**function getData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}*/
 
document.getElementById('dataAtual').innerHTML = getData()

function validarCPF() {
    let cpfInput = document.getElementById('inputCpf');
    let cpf = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
 
    // Resetando o estilo
    cpfInput.style.border = "";
 
    // Verifica se o CPF é composto por 11 dígitos e não é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        cpfInput.style.border = "2px solid red";
        return;
    }
 
    let soma = 0, resto;
 
    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf[i - 1]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) {
        cpfInput.style.border = "2px solid red";
        return;
    }
 
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf[i - 1]) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) {
        cpfInput.style.border = "2px solid red";
        return;
    }
 
    // CPF válido, remove borda vermelha
    cpfInput.style.border = "";
}

//resetar formulário
function resetForm() {
    location.reload()
}
api.resetForm((args) => {
    resetForm()
})



/**api.dbStatus((event, message) => {
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})*/
