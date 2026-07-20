const mongoose = require('mongoose');
module.exports = mongoose.model('produtos', {
    tipoDeProduto: String,
    dono: String, 
    tipoDeNegociacao: String, 
    valor: Number, 
    descricao: String,
    imagem: String
});