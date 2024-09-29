# Documentação do Projeto - Bloguinho

## 1. Introdução

O projeto "Bloguinho" é uma aplicação web desenvolvida com **Next.js** que permite a criação, edição e visualização de posts de blog. Neste sistema, **professores** podem se registrar, fazer login, criar, editar e excluir posts, enquanto **alunos** podem apenas visualizar os posts e deixar comentários.

## 2. Equipe

- Ariel Andrielli Rodrigues da Silva
- Gustavo Almeida Carriel
- José Luccas Gabriel Francisco de Andrade Santos
- Vitor Vilson Laurentino
- Thwany Leles

## 3. Prototipagem

O protótipo da aplicação foi desenvolvido e está disponível no Figma: [Prototipo do Bloguinho](https://www.figma.com/design/bPldSjHtmWBWHiogO8m51g/Desafio-%233?node-id=5-2&node-type=canvas&t=mJoYu6XG2BDm3a6T-0).

## 4. Setup Inicial

### Pré-requisitos

- **Node.js** (v20 ou superior)
- **npm** (v6 ou superior) ou **yarn**
- Um **backend** configurado e em execução

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/thwanyleles/techchallenge3.git
   cd techchallenge3
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. **Backend**: Para que a aplicação funcione corretamente, você precisará rodar o backend. O backend está disponível [neste repositório](https://github.com/FullStack24/techchallenge2/). Certifique-se de que o backend esteja rodando (normalmente na porta 3000) antes de iniciar o frontend.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

5. Abra o navegador e acesse `http://localhost:3001` para visualizar a aplicação.

## 5. Arquitetura da Aplicação

A arquitetura do sistema é baseada na estrutura de pastas do Next.js, que organiza componentes, páginas, contextos e serviços. Abaixo está a estrutura de diretórios do projeto:

```
techchallenge3
├── .github                # Configurações do GitHub
│   └── workflows          # Configurações de CI/CD
│       └── ci-cd.yml     # Arquivo de configuração de CI/CD
├── .next                  # Diretório gerado pelo Next.js para otimização
├── node_modules           # Dependências do projeto
├── public                 # Arquivos públicos disponíveis para o cliente
│   └── bloguinho-logo.svg # Logo do Bloguinho
├── src                    # Código fonte da aplicação
│   ├── app                # Páginas da aplicação
│   │   ├── admin          # Página de administração
│   │   │   └── page.tsx
│   │   ├── create-post    # Página para criação de um novo post
│   │   │   └── page.tsx
│   │   ├── login          # Página de login
│   │   │   └── page.tsx
│   │   ├── post           # Páginas relacionadas a posts
│   │   │   └── [id]
│   │   │       ├── edit   # Página para edição de um post
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx # Página de visualização de um post
│   │   ├── register       # Página de registro
│   │   │   └── page.tsx
│   │   ├── layout.tsx     # Layout principal da aplicação
│   │   └── page.tsx       # Página inicial
│   │   ├── components      # Componentes reutilizáveis da aplicação
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── NavigationButtons.tsx
│   │   │   └── PostList.tsx
│   │   ├── contexts       # Contextos para gerenciamento de estado
│   │   │   └── AuthContext.tsx
│   │   ├── hooks          # Hooks personalizados
│   │   │   ├── useAuth.ts
│   │   │   └── usePosts.ts
│   │   ├── services       # Configuração da API
│   │   │   └── api.ts
│   │   ├── styles         # Estilos globais da aplicação
│   │   │   ├── globals.css
│   │   └── types          # Tipos TypeScript
│   │       ├── Comment.ts
│   │       ├── CommentFormProps.ts
│   │       ├── Post.ts
│   │       └── User.ts
│   └── utils              # Utilitários auxiliares
│       └── helpers.ts
├── .eslintrc.json         # Configuração do ESLint
├── .gitignore             # Arquivos a serem ignorados pelo Git
├── Dockerfile             # Dockerfile na raiz do projeto
├── next.config.mjs        # Configuração do Next.js
├── next-env.d.ts          # Definições de tipos para o Next.js
├── package.json           # Configuração do projeto e dependências
├── package-lock.json      # Lockfile de dependências
├── postcss.config.mjs     # Configuração do PostCSS
├── README.md              # Documentação do projeto
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── tsconfig.json          # Configuração do TypeScript
```

### Descrição das Principais Pastas

- **src/app**: Contém as páginas principais da aplicação, permitindo a navegação entre diferentes seções.
- **src/components**: Contém componentes reutilizáveis que são usados em várias partes da aplicação, como formulários, listas e botões de navegação.
- **src/contexts**: Contém o contexto de autenticação (`AuthContext`), que gerencia o estado do usuário.
- **src/hooks**: Contém hooks personalizados que encapsulam a lógica de estado e efeitos colaterais, como `useAuth` e `usePosts`.
- **src/services**: Contém a configuração da API usando Axios, que permite a comunicação com o backend.
- **src/styles**: Contém os estilos globais da aplicação, utilizando Tailwind CSS para estilização.
- **src/types**: Contém definições de tipos TypeScript para garantir a tipagem estática e a segurança do código.

## 6. Guia de Uso

### Registro e Login de Professores

- Para registrar um novo professor, acesse a página de registro e preencha os campos necessários.
- Após o registro, faça login usando suas credenciais.

### Criação de Posts

- Professores autenticados podem acessar a página de criação de posts.
- Preencha os campos de título, conteúdo e autor, e clique em "Salvar".

### Visualização de Posts

- A página inicial carrega uma lista de posts. Todos os usuários (professores e alunos) podem clicar em "Continuar Lendo" para visualizar um post completo.
- Ao visualizar um post, qualquer usuário pode deixar comentários, mesmo que não esteja logado.
- No entanto, apenas usuários logados podem excluir seus próprios comentários.

### Edição e Exclusão de Posts

- Professores podem acessar a "Sala do Professor" para gerenciar posts existentes.
- Clique em "Editar" para modificar um post ou "Excluir" para removê-lo.

## 7. Desafios e Experiências

Durante o desenvolvimento do projeto, a equipe enfrentou vários desafios, incluindo:

- **Gerenciamento de Estado**: A implementação do contexto de autenticação foi um desafio, especialmente ao lidar com o armazenamento do usuário no `localStorage` e a recuperação dos dados.
- **Integração com o Backend**: A comunicação com a API do backend exigiu atenção especial para garantir que as requisições fossem feitas corretamente e que os erros fossem tratados de forma adequada.
- **Design Responsivo**: A adaptação da interface para diferentes tamanhos de tela utilizando Tailwind CSS foi um aprendizado significativo.

## 8. Conclusão

O projeto "Bloguinho" é uma aplicação funcional que atende aos requisitos de um blog simples, permitindo interações básicas entre professores e alunos. A equipe aprendeu muito sobre o desenvolvimento com Next.js, a integração com APIs e a importância de um design responsivo.

Sinta-se à vontade para contribuir com melhorias ou relatar problemas no repositório.

## 9. Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo `LICENSE` para mais detalhes.