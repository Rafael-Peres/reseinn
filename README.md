# RP - Vagas

Uma API Rest para gerenciamento de vagas. candidados podem se cadastrar na API para enviar seus curriculos as vagas que são postadas por recrudadores.

### Uma API desenvolvida com: 

* NodeJS
* ExpressJS
* Typescript
* PostgresSQL

## Pré-requisitos

* Instalar [NodeJS](https://nodejs.org/en/)
* Instalar [PostgresSQL](https://www.postgresql.org/)

## Começando 

* Copiar o Repositório

``
git clone git@github.com:Rafael-Peres/RP-Vagas.git <Nome-do-Projeto>
``

* Instalar dependências 

``
cd <Nome-do-Projeto>  
yarn
``

* Configurar banco de dados

``
Renomear o arquivo .env.example para .env

Dentro do arquivo .env colocar as informações do seu postgres. e o nome do banco de dados para aplicação.
``
* criar um banco manualmente no postgres, com o mesmo nome que colocou no arquivo.env

``
Apenas criar um banco e mais nada.
``
* criar as tabelas e rodar a aplicação

``
Efetuar o comando yarn dev, ele irá criar as tabelas e subir a aplicação em modo desenvolvimento.
``

## Observação

``
Por padrão a aplicação roda na porta 3535, mas pode ser alterada no src/index.ts
``

## Documentação da API

https://documenter.getpostman.com/view/8324547/SWECWFPh

## Estrutura do banco de dados da aplicação

![public](/public.png)

