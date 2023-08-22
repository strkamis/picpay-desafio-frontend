# PicpayDesafioFrontend

# Introdução
A documentação detalhada abaixo descreve o projeto "PicPay Desafio Frontend", que é uma aplicação CRUD web frontend desenvolvida para o desafio proposto pela empresa PicPay. A aplicação é desenvolvida utilizando a tecnologia Angular e possui funcionalidades contendo login de usuário e a implementação de um painel (dashboard) usando o Angular Material. O painel exibe uma lista de tarefas, permitindo a filtragem dos resultados e apresentando os detalhes de cada tarefa, com listagem dos pagamentos, consumindo os dados de uma API mock(JSON serve), que estará disponivel na raiz do projeto. Foi implementado Testes automatizados utilizando Jest e Karma;

## Instalação
# Pré-requisitos
Certifique-se de ter os seguintes componentes instalados em sua máquina:

Node.js e NPM (Node Package Manager)
Angular CLI instalado globalmente (npm install -g @angular/cli).

## Passos de Instalação
1 - Clone o repositório do projeto para sua máquina:
git clone https://github.com/seu-usuario/picpay-desafio-frontend.git

2 - Navegue até o diretório do projeto:
cd picpay-desafio-frontend

3 - Instale as dependências do projeto:
npm install

4 - Certifique-se de que você tenha instalado o Angular Material e as outras dependências necessárias. Você pode conferir a documentação oficial para mais detalhes sobre a configuração: Angular Material Getting Started.

# Uso
## Executando a Aplicação
Para executar a aplicação, utilize o comando:
ng serve 
e
json-server db.json --port 3030

Acesse a aplicação através do navegador, no endereço http://localhost:4200.

## Rodando os teste unitários

rode `ng test` para executar os testes via  Karma.

# Funcionalidades
## Autenticação
A aplicação oferece uma tela de login onde o usuário pode inserir seu email e senha para autenticação. A autenticação é feita através de uma simulação de serviço de autenticação, conforme detalhado no código fonte.

## Exibição de Tarefas
Após autenticado, o usuário é redirecionado para a página de dashboard, onde pode visualizar uma lista de tarefas. A lista de tarefas é carregada a partir de uma API fictícia e exibida em uma tabela.

## Ordenação de Tarefas
O usuário pode clicar nos cabeçalhos da tabela para ordenar as tarefas com base nas colunas. A ordenação é feita utilizando a funcionalidade de MatSort do Angular Material.

## Edição, Remoção e Inclusão 
Cada tarefa exibida na tabela possui botões para editar e remover a tarefa. Ao clicar no botão de editar, o usuário é apresentado com um diálogo onde pode modificar os detalhes da tarefa. Ao clicar no botão de remover, a tarefa é excluída da lista. E ao clicar no botão adicionar, uma nova tarefa poderá ser adiciona. 

# Considerações Finais

Esta documentação fornece uma visão geral das funcionalidades e instruções básicas para instalação e uso do projeto "PicPay Desafio Frontend". Ficaram faltando algumas melhorias como por exemplo: 
  Revisar acessibilidade;
  
  
  Fazer uma página de perfil para o usuario;
  
  Implementar função de Logout;
  
  Revisar a resposividade dos components
  
  Componentização/modularização;
  
Para mais detalhes técnicos e implementações específicas, consulte o código fonte e os comentários presentes no projeto.
