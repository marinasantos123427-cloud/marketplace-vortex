import React from 'react';
import { Fragment, useState } from 'react';

function CadastrarItens() {

const [produto, setProduto] = useState({
    tipoDeProduto: '',
    dono: '', 
    tipoDeNegociacao: '', 
    valor: '', 
    descricao: ''
});

const [imagem, setImagem] = useState(null);

async function cadastrarProduto(){

    const formData = new FormData()

    formData.append("dono", produto.dono)
    formData.append("valor", produto.valor)
    formData.append("descricao", produto.descricao)
    formData.append("tipoDeNegociacao", produto.tipoDeNegociacao)
    formData.append("tipoDeProduto", produto.tipoDeProduto)

    if (imagem) {
        formData.append("imagem", imagem)
    }

    await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        body: formData
    });

    setProduto({
    tipoDeProduto: '',
    dono: '',
    tipoDeNegociacao: '',
    valor: '',
    descricao: ''
    });
    
    setImagem(null);

    console.log("Produto cadastrado!")
}

return (
    <div>
      <p className="text-red-500 text-left text-xl pb-8">Cadastre aqui os seus itens para vender ou doar!</p>
      <div className="relative w-full">

            <p className="text-left text-xl">Nome do dono do produto: {produto.dono}</p>
            <input className="block px-4 py-2 border rounded-md text-left mt-3" type='text' value={produto.dono} onChange={(e) => setProduto({...produto, dono: e.target.value})}/>

            <p className="text-left text-xl pt-10">Tipo de produto: </p>
            <select className="block px-2 py-1 border rounded-md mt-3 -mb-2" value={produto.tipoDeProduto} onChange={(e) => setProduto({...produto, tipoDeProduto: e.target.value})}>
                <option value="">Selecione...</option>
                <option value="livro">Livro</option>
                <option value="artigo de papelaria">Artigo de papelaria</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="vestuario">Vestuário</option>
                <option value="calculadora">Calculadora</option>
                <option value="xerox">Xerox</option>
                <option value="moveis">Móveis</option>
                <option value="equipamento pratico">Equipamento prático</option>
                <option value="equipamento de medicao">Equipamento de medição</option>
                <option value="outro">Outro</option>
            </select>

            <p className="text-left text-xl pt-10">Tipo de negociação: </p>
            <select className="block px-2 py-1 border rounded-md mt-3 -mb-2"
                value={produto.tipoDeNegociacao}
                onChange={(e) => setProduto({...produto, tipoDeNegociacao: e.target.value})}>
                 <option value="">Selecione...</option>
                <option value="venda">Venda</option>
                <option value="doacao">Doação</option>
            </select>

            <p className="text-left text-xl pt-10">Descrição: {produto.descricao}</p>
            <input className="block px-4 py-2 border rounded-md mt-3" type ="text" value={produto.descricao} onChange={(e) => setProduto({...produto, descricao: e.target.value})}/>

            <p className="text-left text-xl pt-10">Valor(Se for para doação, determine o valor como 0):  {produto.valor}</p>
            <input className="block px-4 py-2 border rounded-md mt-3" type ="text" value={produto.valor} onChange={(e) => setProduto({...produto, valor: e.target.value})}/>
            
            <p className="text-left text-xl pt-10">Faça o upload de uma imagem do produto:  </p>
            <input className="block px-4 py-2 border rounded-md mt-3" type ="file" accept="image/png, image/jpeg"  onChange={(e) => setImagem(e.target.files[0])}/>
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-hidden focus:ring-1 focus:ring-offset-2 mt-10 block"onClick={cadastrarProduto}>Cadastrar</button>

     </div>
    </div>
  );
};

export default CadastrarItens;