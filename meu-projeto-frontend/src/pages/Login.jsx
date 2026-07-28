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
        navigate('/meusprodutos');
    }

    return (
    <div>
        <p className='text-lg font-medium text-gray-700 mb-2'>Nome: </p>
       <input  className="block px-4 py-2 border rounded-md mt-3" type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
      <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mt-6' onClick={entrar}>Entrar</button>
    </div>
  );
  
};

export default Login;