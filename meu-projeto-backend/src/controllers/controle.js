const mongoose = require('mongoose'); 
const produto = require('../models/produtos'); 

module.exports = { 
    async index (req, res){
        const produtos = await produto.find();

        return res.json(produtos);
    }
}