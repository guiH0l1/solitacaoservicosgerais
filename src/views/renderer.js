//console.log("Processo de renderização")

function client() {
  location.href = './employee.html'
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
 
document.getElementById('dataAtual').innerHTML = getData()


/**api.dbStatus((event, message) => {
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})*/
