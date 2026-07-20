import React from 'react';
import { Fragment, useState, useEffect } from 'react';

const categorias = ['Livro', 'Artigo de papelaria', 'Eletronicos', 'Vestuário', 'Calculadora', 'Xerox', 'Móveis', 'Equipamento prático', 'Equipamento de medição', 'Outro'];

function Home () {

  const [produtos, setProdutos] = useState([])
  const [categoriaSel, setCategoriaSel] = useState('')
  const produtosFiltrados = produtos
  .filter((produto) => categoriaSel === '' || produto.tipoDeProduto === categoriaSel)
  /*.filter((produto) => categoriaSel === '' || produto.tipoDeNegociacao === categoriaSel)*/

  useEffect(() => {
    async function buscarProdutos() {
      const res = await fetch('http://localhost:3000/produtos');
      const dados = await res.json();
      setProdutos(dados);
    }
    buscarProdutos();
  }, []);

  return (
    <div>
      
      <select className="block px-2 py-1 border rounded-md mt-3 mb-8" value ={categoriaSel} onChange={(e) => setCategoriaSel(e.target.value)}>
        <option value="">Todas as categorias</option>
        
        {categorias.map((categ) => (
          <option key={categ} value={categ}>{categ}</option>
        ))}
        
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {produtosFiltrados.map((produto) => (
        <div key={produto._id} className="bg-white rounded-lg shadow p-4">
          <img src={`http://localhost:3000/uploads/${produto.imagem}`} alt={produto.descricao} className="w-full h-40 object-cover rounded"/>
          <p className="font-bold">{produto.tipoDeProduto}</p>
          <p>{produto.descricao}</p>
          <p>{produto.tipoDeNegociacao === 'doacao' ? 'Doação' : `R$ ${produto.valor}`}</p>
        </div>
      ))}
    </div>    
    </div>
  

  );    
}
export default Home;