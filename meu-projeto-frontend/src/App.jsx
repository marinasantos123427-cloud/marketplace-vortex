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
  const [produtos, setProdutos] = useState([]);
  
  function sair(){
    localStorage.removeItem('usuario');
    setUsuario('');
  }

  useEffect(() => {
    async function buscarProduto() {
      const res = await fetch (`${import.meta.env.VITE_API_URL}/produtos`);
      const dados = await res.json();
      setProdutos(dados);
    }
    buscarProduto();
  }, []);

  const navigate = useNavigate();
  return (  
  <div className="min-h-screen bg-gray-100">  
    <nav className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between shadow-md flex-wrap">
        <ul className={usuario === '' ? "text-base md:text-xl flex items-center gap-8 font-medium" : "flex items-center gap-4 md:gap-98 font-medium text-base md:text-xl"}>
          {usuario === '' &&(
            <li>
            <Link to="/" className="flex flex-wrap gap-2 mb-0.2 hover:text-blue-400 transition-colors"> 
              Home
            </Link>
          </li>
          )}
      
          <li>
            <button onClick={() => setMostrarBusca(!mostrarBusca)} className=" hover:text-blue-400 transition-colors text-base md:text-xl font-medium"> 
              Buscar<span>🔍</span>
            </button>
            {mostrarBusca && (
              <input type="text" placeholder='Pesquisar produto...' value={termoBusca} className="px-1 py-1 rounded-md text-gray-500 bg-white ml-1 mb-1" onChange={(e) => setTermoBusca(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && termoBusca !== '') navigate('/buscar')}}/>
            )}
          </li>
        </ul>
        <div className="flex items-center gap-3 md:gap-12" >
        
        {usuario !== '' &&(
          <div className="flex items-center gap-10 text-base md:text-xl">

            <>
            <Link to="/cadastrar" className="hover:text-blue-400 transition-colors font-medium">
              Cadastrar itens
            </Link>

            <Link to="/meusprodutos" className="hover:text-blue-400 transition-colors font-medium">
              Meus Produtos
            </Link>
          </>
          
          </div>
        )}
        {usuario === '' ? (<Link to="/login" className="hover:text-blue-400 transition-colors text-base md:text-xl font-medium">
              Entrar
            </Link>) : (<div className="text-base md:text-xl font-medium">Olá, {usuario} | <button onClick={sair} className="underline hover:text-blue-400 text-base md:text-xl font-medium"  >Sair</button></div>
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
    </div>
  );
}


export default App
