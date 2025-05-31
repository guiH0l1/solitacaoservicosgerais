const { model, Schema } = require('mongoose')

const employeeSchema = new Schema({
    nome: { type: String },
    cpf: { type: String, unique: true, index: true},
    email: { type: String},
    telefone: { type: String },
    cargo: {type: String},
    unidade: {type: String}
}, {versionKey: false})

module.exports = model('employee', employeeSchema)