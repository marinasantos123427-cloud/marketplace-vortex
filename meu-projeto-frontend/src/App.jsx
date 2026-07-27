import { Routes, Route, Link, useNavigate } from "react-router-dom";
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
import PWABadge from "./PWABadge.jsx";


function App() {

  const [count, setCount] = useState(0)
  const [termoBusca, setTermoBusca] = useState('');
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || '')
  const [mostrarBusca, setMostrarBusca] = useState(false);

  function sair(){
    localStorage.removeItem('usuario');
    setUsuario('');
  }

  useEffect(() => {
    async function buscarProduto() {
      const res = await fetch ('http://localhost:3000/produtos');
      const dados = await res.json();
      setProdutos(dados);
    }
    buscarProduto();
  }, []);

  const navigate = useNavigate();
  return (  
  <>  
    <nav className="bg-slate-900 text-white px-8 py-3 flex items-center justify-between shadow-md">
        <ul className={usuario === '' ? "flex items-center gap-98 font-medium" : "flex items-center gap-68 font-medium"}>
          <li>
            <Link to="/" className="flex flex-wrap gap-2 mb-0.2 hover:text-blue-400 transition-colors"> 
              Home
            </Link>
          </li>
    
          <li>
            <button onClick={() => setMostrarBusca(!mostrarBusca)} className=" hover:text-blue-400 transition-colors"> 
              Buscar<span>🔍</span>
            </button>
            {mostrarBusca && (
              <input type="text" placeholder='Pesquisar produto...' value={termoBusca} className="px-2 py-1 rounded-md text-black bg-white ml-1 mb-1" onChange={(e) => setTermoBusca(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && termoBusca !== '') navigate('/buscar')}}/>
            )}
          </li>
        </ul>
        <div  className="flex items-center gap-12">
        
        {usuario !== '' &&(
          <div className="flex items-center gap-10">

            <>
            <Link to="/cadastrar" className="hover:text-blue-400 transition-colors">
              Cadastrar itens
            </Link>

            <Link to="/meusprodutos" className="hover:text-blue-400 transition-colors">
              Meus Produtos
            </Link>
          </>
          
          </div>
        )}
        {usuario === '' ? (<Link to="/login" className="hover:text-blue-400 transition-colors">
              Entrar
            </Link>) : (<div>Olá, {usuario} | <button onClick={sair} className="underline hover:text-blue-400"  >Sair</button></div>
            )}
        </div>
    </nav>
     <main className="p-8">
      <PWABadge />
        <Routes>
          <Route path="/" element={<Home usuario={usuario}/>} />
          <Route path="/cadastrar" element={<CadastrarItens usuario={usuario}/>} />
          <Route path="/login" element={<Login setUsuario={setUsuario}/>} /> 
          <Route path="/meusprodutos" element={<MeusProdutos usuario={usuario}/>} />
          <Route path="/buscar" element={<Buscar termoBusca = {termoBusca}/>} />
        </Routes>
      </main>
    </>
  );
}


export default App
