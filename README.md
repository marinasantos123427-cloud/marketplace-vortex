# Marketplace de Economia Circular do Campus
## Sobre o projeto
Visando apoiar os alunos calouros que estão começando a vida acadêmica e necessitam comprar materiais para o seu curso, podendo ser itens de alto valor, como também dar uma oportunidade para os alunos veteranos que já utilizaram determinado material e desejam dar um outro destino para o item, essa plataforma foi criada para estimular o reuso de itens entre os estudantes da Universidade e criar esse ambiente de doações/vendas interno próprio.
## Tecnologias utilizadas
### Backend
- Node.js
- Express
- MongoDB + Mongoose
- dotenv
- Insomnia
### Frontend 
- React
- Vite
- Tailwind CSS
- React Router
- PWA   
## Como rodar localmente
### Pré-requisitos
Node.js, conta no MongoDB Atlas e MongoDB Compass. 
### Backend
1. Acesse a pasta: `cd meu-projeto-backend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz da pasta com sua connection string do Atlas:
   MONGO_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/meu-primeiro-banco
   (não versionado, por estar no .gitignore)
4. Rode o servidor: `npm start`
## Diário de Bordo da IA
### Ferramentas utilizadas
- Claude/Claude Code, Gemini.
### Frontend
1. Acesse a pasta: `cd meu-projeto-frontend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz da pasta com:
   VITE_API_URL=http://localhost:3000
   (não versionado por estar no .gitignore)
4. Rode o projeto: `npm run dev`
5. Abra no navegador: http://localhost:5173
### Estratégia de Engenharia de Prompts
Exemplo 1: "Eu estava pensando em mudar a forma como o usuario fornece a informacao do tipo de produto a ser cadastrado. ao inves de ele poder digitar livremente o tipo, eu iria colocar opcoes ja fixas, como ja tem no tipo de negociacao, e no fim uma opcao Outro pra ai sim, a pessoa poder digitar".
→ contexto: Primeiramente, todas as informações que o usuário fornecia para cadastrar um produto eram digitadas por ele e armazenadas. Porém, enquanto eu estava testando essa configuração, percebi que dar essa liberdade para o usuário de classificar o tipo de produto iria interferir, posteriormente, no momento de fazer o filtro dos produtos, porque cada pessoa iria digitar o que considerasse o tipo ideal para o seu produto, deixando uma vasta gama de opções para eu considerar e filtrar. Então, para resolver esse problema, resolvi eu mesma determinar os tipos de produtos mais comuns e adequados no contexto universitário e deixar as opções já definidas para o usuário.

Exemplo 2: "nao entendi esse .map((p))".
→ contexto: Eu utilizei a função .map() várias vezes no meu código, mas inicialmente não tinha compreendido bem para que servia. Depois entendi que o .map, associado a um Array, percorre cada item do array (que nesse exemplo nomeei de p) e transforma em algo novo — no meu caso, cada produto vira um card na tela.

Exemplo 3: "eu posso botar as abas de Cadastrar itens e Meus produtos so para quem tiver login".
→ contexto: Estava discutindo sobre como seria a arquitetura do website e sugeri esse modelo, porque faria mais sentido e não iria poluir a navbar com diversos links. Depois, eu tive que aprender a aplicar essa condição no meu código por meio do useEffect, porque se eu só condicionasse por meio dos Links na navbar, a mudança ocorreria somente na UI, continuando a ter o acesso dessas duas páginas pela URL. 
### Reflexão Crítica
Ocorreram situações em que a IA trazia uma solução para o problema, porém não era muito clara na minha situação. Por exemplo, quando eu hospedei o meu backend no Render, tive que mudar a URL referente ao servidor local (localhost) pela URL referente ao Render, e coloquei a URL sem o caminho do local que armazena os dados dos produtos. Obviamente, deu erro, e eu decidi abrir o console para ver o erro, que dizia que não estava achando o lugar onde os produtos estavam. Por causa de situações e problemas anteriores, fui abrir o Inspecionar e cliquei na aba Network, porque eu tinha aprendido que essa aba se relaciona com as requisições que acontecem no website. Ao fazer isso, percebi que a URL estava sem o "/produtos", o caminho que indicaria os dados dos produtos, aí eu adicionei o "/produtos" de volta na URL.
## Links de produção
- Backend (Render) : https://marketplace-vortex.onrender.com
- Frontend (Vercel) : https://marketplace-vortex-e9j1.vercel.app/
