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

function App() {

  const [count, setCount] = useState(0)
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  

  return (  
  <>  
    <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between shadow-md">
        <ul className="flex items-center gap-88 font-medium">
          <li>
            <Link to="/" className="flex flex-wrap gap-2 mb-6"> 
              Home
            </Link>
          </li>
          <li>
            <Link to="/cadastrar" className="hover:text-blue-400 transition-colors">
              Cadastrar itens
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
    </nav>
     <main className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarItens />} />
        </Routes>
      </main>
    </>
  );
}


export default App
