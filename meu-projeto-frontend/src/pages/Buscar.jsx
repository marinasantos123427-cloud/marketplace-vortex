import React from 'react';
import {Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Buscar({termoBusca}) {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);


   useEffect(() => {
    async function buscarProduto() {
      const res = await fetch (`${import.meta.env.VITE_API_URL}/produtos`);
      const dados = await res.json();
      setProdutos(dados);
    }
    buscarProduto();
  }, []);

  const resultados = produtos.filter((p) => p.descricao.toLowerCase().includes(termoBusca.toLowerCase()) || p.tipoDeProduto.toLowerCase().includes(termoBusca.toLowerCase()));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resultados.map((res) => (
          <div key={res._id} className="bg-white rounded-lg shadow p-4">
            <img src={res.imagem} alt={res.descricao} className="w-full h-40 object-cover rounded"></img>
            <p className="font-bold">{res.tipoDeProduto}</p>
            <p>{res.descricao}</p>
            <p>{res.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${res.valor}`}</p>
        </div>
        ))}
      </div>

    </div>
              
  );
  
};

export default Buscar;