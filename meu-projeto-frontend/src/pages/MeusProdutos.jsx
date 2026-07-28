import React from 'react';
import {Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MeusProdutos({usuario}) {

    const [meusProdutos, setMeusProdutos] = useState([]);
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
            if (usuario === ''){
                navigate('/')
            }
        }, [usuario]);

    useEffect(() => {
        async function buscarMeusProdutos(){
           const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos?dono=${usuario}`);
           const dados = await res.json();
           setMeusProdutos(dados);
        }
        buscarMeusProdutos();
    }, []);

    async function deletarProduto(id){
      if (!window.confirm('Excluir este produto?')) return;
        await fetch(`${import.meta.env.VITE_API_URL}/produtos/${id}`, {
          method: 'DELETE'
        }); 
        setMeusProdutos((prev) => prev.filter((p) => p._id !== id));
        setMensagem('Item excluído com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
    }

    return (
      <>
      <h1 className="text-2xl font-bold mb-6">Meus produtos</h1>
      {meusProdutos.length === 0 &&(
        <p className="text-gray-500 ">Você ainda não anunciou nenhum produto.</p>
      )}
      {mensagem !== '' && (
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4"> {mensagem}</p>
      )}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {meusProdutos.map((prod) => (
        <div key={prod._id} className="bg-white rounded-lg shadow p-4">
            <img src={prod.imagem} alt={prod.descricao} className="w-full h-40 object-cover rounded"></img>
            <p className="font-bold capitalize">{prod.tipoDeProduto}</p>
            <p>{prod.descricao}</p>
            <p>{prod.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${prod.valor}`}</p>
            <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-hidden focus:ring-1 focus:ring-offset-2 mt-10 block' onClick={() => deletarProduto(prod._id)}>Excluir produto</button>
        </div>

      ))}
    </div>
    </>
  );
  
};

export default MeusProdutos;