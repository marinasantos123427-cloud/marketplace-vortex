import React from 'react';
import {Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Login({setUsuario}) {

    const navigate = useNavigate();
    const [nome, setNome] = useState('');

    function entrar(){
        if (nome.trim() === '')return;
        localStorage.setItem('usuario', nome);
        setUsuario(nome);
        navigate('/MeusProdutos');
    }

    return (
    <div>
        <p>Nome: </p>
       <input  className="block px-4 py-2 border rounded-md mt-3" type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
      <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-hidden focus:ring-1 focus:ring-offset-2 mt-10 block' onClick={entrar}>Entrar</button>
    </div>
  );
  
};

export default Login;