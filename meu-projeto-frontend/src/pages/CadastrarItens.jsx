import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastrarItens({usuario}) {


const navigate = useNavigate();
const [mensagem, setMensagem] = useState('');
const [produto, setProduto] = useState({
    tipoDeProduto: '',
    dono: '', 
    tipoDeNegociacao: '', 
    valor: '', 
    descricao: ''
});

useEffect(() => {
        if (usuario === ''){
            navigate('/')
        }
    }, [usuario])

const [imagem, setImagem] = useState('');

async function cadastrarProduto(){
    await fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({...produto, dono: usuario, imagem: imagem}) //formData
    });

    setProduto({
    tipoDeProduto: '',
    dono: '',
    tipoDeNegociacao: '',
    valor: '',
    descricao: '',
    imagem: ''
    });

    setMensagem('Produto cadastrado com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
}

function lerImagem(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImagem(reader.result);
    reader.readAsDataURL(file)
}

return (
    
    <div>
        {mensagem !== '' && (
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4"> {mensagem}</p>
    )}
      <p className="text-indigo-800 font-semibold text-left text-xl text-">Cadastre aqui os seus itens para vender ou doar!</p>
      <div className="relative w-full">

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

            <p className="text-left text-xl pt-10">Descrição: </p>
            <input className="block px-4 py-2 border rounded-md mt-3" type ="text" value={produto.descricao} onChange={(e) => setProduto({...produto, descricao: e.target.value})}/>

            <p className="text-left text-xl pt-10">Valor(Se for para doação, determine o valor como 0): </p>
            <input className="block px-4 py-2 border rounded-md mt-3" type ="text" value={produto.valor.replace(',', '.')} onChange={(e) => setProduto({...produto, valor: e.target.value})}/>
            
            <p className="text-left text-xl pt-10">Escolha uma imagem do produto:  </p>
            <input className="block px-1 py-2 border rounded-md mt-3" type ="file" placeholder='Cole a url da imagem'  accept='image/*' onChange={lerImagem} />
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-hidden focus:ring-1 focus:ring-offset-2 mt-10 block" onClick={cadastrarProduto}>Cadastrar</button>

     </div>
    </div>
  );
};

export default CadastrarItens;