import React from 'react';
import {Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MeusProdutos({usuario}) {

    const [meusProdutos, setMeusProdutos] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
            if (usuario === ''){
                navigate('/')
            }
        }, [usuario]);

    useEffect(() => {
        async function buscarMeusProdutos(){
           const res = await fetch(`http://localhost:3000/produtos?dono=${usuario}`);
           const dados = await res.json();
           setMeusProdutos(dados);
        }
        buscarMeusProdutos();
    }, []);

    return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {meusProdutos.map((prod) => (
        <div key={prod._id} className="bg-white rounded-lg shadow p-4">
            <img src={`http://localhost:3000/uploads/${prod.imagem}`} alt={prod.descricao} className="w-full h-40 object-cover rounded"></img>
            <p className="font-bold">{prod.tipoDeProduto}</p>
            <p>{prod.descricao}</p>
            <p>{prod.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${prod.valor}`}</p>
        </div>

      ))}
    </div>
  );
  
};

export default MeusProdutos;