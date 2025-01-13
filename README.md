# Folha de Ponto - Frontend

Este projeto é o frontend da aplicação de folha de ponto, desenvolvido com React e Vite. Ele é responsivo e oferece uma interface intuitiva para os funcionários registrarem e visualizarem seus pontos.

## Características Principais

- **Framework:** React
- **Build Tool:** Vite
- **Estilização:** CSS e Bootstrap
- **Roteamento:** React Router
- **Autenticação:** Baseada em tokens JWT

## Configuração do Ambiente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```   

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e defina a variável `VITE_API_BASE_URL` com a URL do backend:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

   **Para fins de testes, foi criado um arquivo chamado config.ts para armazenar a url da api desse projeto, deixando o projeto pronto para ser iniciado**

## Como Executar a Aplicação

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse a aplicação no navegador:
   ```
   http://localhost:5173
   ```

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera os arquivos otimizados para produção.
- **`npm run preview`**: Visualiza a aplicação após o build.

## Funcionalidades

- **Login:** Permite ao usuário acessar o sistema com seu código de acesso.
- **Registrar Ponto:** Facilita o registro de entrada, saída e intervalos.
- **Visualizar Histórico Mensal:** Exibe um resumo dos registros de ponto do mês.
- **Responsividade:** Interface otimizada para dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **React**
- **Vite**
- **CSS**
- **Bootstrap**
- **React Router**
