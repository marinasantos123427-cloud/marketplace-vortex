import React from 'react';
import { Fragment, useState, useEffect } from 'react';



function Home ({usuario}) {

  const categorias = [{valor: 'livro', rotulo: 'Livro'}, {valor: 'artigo de papelaria', rotulo: 'Artigo de papelaria'}, {valor: 'eletronicos', rotulo: 'Eletronicos'} , {valor: 'vestuario', rotulo: 'Vestuário'} , {valor: 'calculadora', rotulo: 'Calculadora'}, {valor: 'xerox', rotulo: 'Xerox'}, {valor: 'moveis', rotulo: 'Móveis'} , {valor: 'equipamento pratico', rotulo: 'Equipamento prático'}, {valor: 'equipamento de medicao', rotulo: 'Equipamento de medição'} , {valor: 'outro', rotulo: 'Outro'} ];

  const [produtos, setProdutos] = useState([])
  const [categoriaSel, setCategoriaSel] = useState('')
  const produtosFiltrados = produtos
  .filter((produto) => categoriaSel === '' || produto.tipoDeProduto === categoriaSel)
  /*.filter((produto) => categoriaSel === '' || produto.tipoDeNegociacao === categoriaSel)*/

  useEffect(() => {

    async function buscarProdutos() {
      const res = await fetch('https://marketplace-vortex.onrender.com');
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {produtosFiltrados.map((produto) => (
        <div key={produto._id} className="bg-white rounded-lg shadow p-4">
          <img src={`http://localhost:3000/uploads/${produto.imagem}`} alt={produto.descricao} className="w-full h-40 object-cover rounded"/>
          <p className="c">{produto.tipoDeProduto}</p>
          <p>{produto.descricao}</p>
          <p>{produto.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${produto.valor}`}</p>
        </div>
      ))}
    </div>    
    </div>
  

  );    
}
export default Home;