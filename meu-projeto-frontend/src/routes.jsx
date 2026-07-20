import { Routes, Route } from 'react-router-dom';

// 1. Sua página Home exclusiva
const Home = () => (
  <div className="bg-white p-6 rounded shadow">
    <h1 className="text-2xl font-bold">Início (Home)</h1>
    <p className="text-gray-600">Conteúdo da tela inicial.</p>
  </div>
);

// 2. Sua página de Cadastro exclusiva
const Cadastrar = () => (
  <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
    <h1 className="text-2xl font-bold text-blue-600 mb-4">Página Exclusiva de Cadastro</h1>
    <form className="space-y-4 max-w-sm">
      <input type="text" placeholder="Nome do item..." className="w-full p-2 border rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  </div>
);

// 3. Sua página de Busca exclusiva
const Buscar = () => (
  <div className="bg-white p-6 rounded shadow">
    <h1 className="text-2xl font-bold">Busca de Itens</h1>
    <p className="text-gray-600">Tela para pesquisar seus itens.</p>
  </div>
);

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/buscar" element={<Buscar />} />
    </Routes>
  );
}   