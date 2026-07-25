import { Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home.jsx';
import CadastrarItens from './pages/CadastrarItens';
import Buscar from './pages/Buscar';
import Login from './pages/Login';
import MeusProdutos from "./pages/MeusProdutos.jsx";

function App() {

  const [count, setCount] = useState(0)
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || '')

  function sair(){
    localStorage.removeItem('usuario');
    setUsuario('');
  }

  return (  
  <>  
    <nav className="bg-slate-900 text-white px-8 py-3 flex items-center justify-between shadow-md">
        <ul className="flex items-center gap-58 font-medium">
          <li>
            <Link to="/" className="flex flex-wrap gap-2 mb-0.2 hover:text-blue-400 transition-colors"> 
              Home
            </Link>
          </li>
    
          <li>
            <button onClick={() => setMostrarBusca(!mostrarBusca)} className="hover:text-blue-400 transition-colors" >
              Buscar<span>🔍</span>
            </button>
            {mostrarBusca && (
              <input type="text" placeholder='Pesquisar produto...' value={termoBusca} className="px-3 py-1 rounded-md text-black bg-white ml-3" onChange={(e) => setTermoBusca(e.target.value)}/>
            )}  
          </li>
        </ul>
        {usuario === '' ? (<Link to="/login" className="hover:text-blue-400 transition-colors">
              Entrar
            </Link>) : (<div>Olá, {usuario} | <button onClick={sair} className="underline hover:text-blue-400"  >Sair</button></div>
            )}
        {usuario !== '' &&(
          <div>
          <li>
            <Link to="/cadastrar" className="hover:text-blue-400 transition-colors">
              Cadastrar itens
            </Link>
          </li>

          <li>
            <Link to="/meusprodutos" className="hover:text-blue-400 transition-colors">
              Meus Produtos
            </Link>
          </li>
          </div>
        )}
    </nav>
     <main className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarItens usuario={usuario}/>} />
          <Route path="/login" element={<Login setUsuario={setUsuario}/>} /> 
          <Route path="/meusprodutos" element={<MeusProdutos usuario={usuario}/>} />
        </Routes>
      </main>
    </>
  );
}


export default App
