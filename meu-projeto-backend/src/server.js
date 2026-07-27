const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Produto = require('./models/produtos.js'); 
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

mongoose.connect('mongodb+srv://marinasantos123427_db_user:<db_password>@cluster0.srcjeyl.mongodb.net/?appName=Cluster0');

const app = express(); 

app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads/'))

app.post('/produtos', upload.single('imagem'), async (req, res) => {
    if (req.file === undefined){
        return res.sendStatus(400);
    }
    try {
            const dados = {...req.body, imagem: req.file.filename}
            const produto = new Produto(dados);
            if (!produto.tipoDeProduto || produto.valor === undefined || !produto.imagem){
                throw new Error("Falta de informaçoes!")
            }   
            await produto.save();
            res.json(produto);
        } catch (erro){
            console.error(erro)
            res.status(500).json({
                erro: "Erro ao salvar o produto no servidor!"
            })
        }
    
})

app.get('/produtos', async (req, res) => {
    try {
        
        const filtro = {}

        if (req.query.dono){
            filtro.dono = req.query.dono
        }
        const produtosFiltrados = await Produto.find(filtro).sort({_id: -1});
        res.json(produtosFiltrados);
    } catch (erro){
         console.error("Erro na busca");
         res.status(404).json({ // o res.status envia o codigo de status HTTP 404 em formato JSON 
        erro: erro.message
        })
       
    }
    
})

app.delete('/produtos/:id', async (req, res) => {
    try{
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto){
            throw new Error("Id nao achado!")
        } 
        res.sendStatus(204);
    } catch(erro){
        res.status(500).json({
            erro: "Erro ao tentar deletar produto!"
        })
    }
    
})

app.put('/produtos/:id', async (req, res) => {
    try{
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            req.params.id, req.body, {new : true}
        );

        if (!produtoAtualizado){
            throw new Error("Produto nao atualizado!")
        }
        res.status(200).json(produtoAtualizado);
    }catch(erro){
        res.status(500).json({
            erro: "Erro ao atualizar o produto"
        })
        
    }
})
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})