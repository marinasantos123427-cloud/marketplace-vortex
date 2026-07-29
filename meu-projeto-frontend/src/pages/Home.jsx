import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Login from './Login';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import PWABadge from '../PWABadge';
import Buscar from './Buscar';

function Home ({usuario}) {

  const categorias = [{valor: 'livro', rotulo: 'Livro'}, {valor: 'artigo de papelaria', rotulo: 'Artigo de papelaria'}, {valor: 'eletronicos', rotulo: 'Eletronicos'} , {valor: 'vestuario', rotulo: 'Vestuário'} , {valor: 'calculadora', rotulo: 'Calculadora'}, {valor: 'xerox', rotulo: 'Xerox'}, {valor: 'moveis', rotulo: 'Móveis'} , {valor: 'equipamento pratico', rotulo: 'Equipamento prático'}, {valor: 'equipamento de medicao', rotulo: 'Equipamento de medição'} , {valor: 'outro', rotulo: 'Outro'} ];

  const [produtos, setProdutos] = useState([])
  
  const [categoriaSel, setCategoriaSel] = useState('')
  const produtosFiltrados = produtos
  .filter((produto) => categoriaSel === '' || produto.tipoDeProduto === categoriaSel)
  /*.filter((produto) => categoriaSel === '' || produto.tipoDeNegociacao === categoriaSel)*/

  useEffect(() => {

    async function buscarProdutos() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos`);
      const dados = await res.json();
      setProdutos(dados);
    }

    buscarProdutos();
    
  }, []);

  const totalItens = produtos.length;
  const totalDoacoes  = produtos.filter((p) => p.tipoDeNegociacao === "doacao").length;
  const estatisticas = [
    {numero: totalItens, rotulo: 'Itens anunciados'},
    {numero: totalDoacoes, rotulo: 'Doações disponíveis'}, 
    {numero: '100+', rotulo: 'Estudantes na plataforma'}
  ];

  return (
    <div>
      {usuario === '' && (
        <>
        <div className="bg-slate-900 text-white rounded-2xl p-10 my-10 ">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-left">Economia circular na <span className="text-blue-600">Unifor</span></h1>
          <p className="mb-8 text-2xl text-gray-200 max-w-2xl text-left "> 
            Plataforma criada para:  </p>
            <ul className="text-lg text-gray-300 max-w-4xl space-y-4 text-left leading-relaxed font-mono"> 
              <li>🤝 Democratizar o acesso a itens entre os calouros</li>
              <li>🔄 Criar uma rede de doações/vendas interna e controlada</li>
              <li>♻️ Evitar o descarte semestral de materiais reaproveitáveis por meio do mercado circular</li>
            </ul>
        </div> 
        <div className="bg-white gap-10 rounded-2xl shadow-md p-8 my-8 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"> Tem algo parado? Desapega!</p>
          <p className="text-gray-500 mb-6">Anuncie seus itens e ajude outros estudantes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link to="/login" className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
          Anunciar item
          </Link>
          <a href="#vitrine" className="inline-block bg-white text-green-700 border-2 border-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
          Buscar itens
          </a>
          </div> 
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
      {estatisticas.map((stat) => (
        <div key={stat.rotulo} className="bg-white rounded-lg shadow p-4 text-center">
         <p className="text-3xl font-bold text-blue-600"> {stat.numero}</p>
         <p className="text-gray-600">{stat.rotulo} </p>
        </div>
      ))}
    </div>
    </>
      )}
  
      <select className="block px-2 py-1 border rounded-md mt-3 mb-8" value ={categoriaSel} onChange={(e) => setCategoriaSel(e.target.value)}>
        <option value="">Todas as categorias</option>
        
        {categorias.map((categ) => (
          <option key={categ.rotulo} value={categ.valor}>{categ.rotulo}</option>
        ))}
        
      </select>

      <div id="vitrine" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {produtosFiltrados.map((produto) => (
        <div key={produto._id} className="bg-white rounded-lg shadow p-4">
          <img src={produto.imagem} alt={produto.descricao} className="w-full h-80 object-cover rounded"/>
          <p className="font-bold capitalize text-2xl">{produto.tipoDeProduto}</p>
          <p className='text-xl'>Descrição: {produto.descricao}</p>
          <p className='text-xl'>{produto.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${produto.valor}`}</p>
        </div>
      ))}
    </div>    
     <main className="p-8">
      <PWABadge />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </main>
    </div>
  

  );    
}
export default Home;