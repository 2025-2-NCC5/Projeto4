
# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href="https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP" border="0"></a>
</p>

# **Datalivery Dashboard**

<p align="center">
<img src="./imagens/datalivery-logo.png" width="620">
</p>

## Grupo 4

### Integrantes:
- **Beatriz de Souza Santos Rio Branco** — <a href="https://www.linkedin.com/in/biaib/">LinkedIn</a>
- **Sátiro Gabriel de Souza Santos** — <a href="https://www.linkedin.com/in/s%C3%A1tiro-gabriel-27081430b/">LinkedIn</a>
- **Sabrinna Cristina Gomes Vicente** — <a href="https://www.linkedin.com/in/sabrinna-vicente-049225306/">LinkedIn</a>
- **Rodrigo Correa da Gama** — <a href="https://www.linkedin.com/in/rodrigocgama04/">LinkedIn</a>

### Professores Orientadores:
Victor Bruno Alexander Rosetti de Quiroz,  
Rodrigo da Rosa,  
Renata Muniz,  
Marcos Minoru Nakatsugawa,  
Rafael Diogo Rossetti.

---

## 🎯 Descrição

A **datalivery** é uma plataforma de inteligência de dados desenvolvida para negócios do ramo alimentício com foco em **entregas delivery**.

O objetivo do sistema é **transformar dados operacionais em decisões estratégicas**, permitindo que o gestor acompanhe desempenho, visualize métricas de comportamento dos consumidores e receba insights que ajudem a melhorar retenção, experiência e faturamento.

A proposta inclui:
- Dashboard completo acessível via navegador
- Clusterização de clientes (K-Means) → identificação de padrões de consumo
- Ranking de clientes por ticket, fidelidade e recorrência
- Métricas de NPS e engajamento
- Armazenamento em nuvem com **Neon PostgreSQL**
- Frontend em **Next.js** + gráficos dinâmicos
- Backend integrado a APIs com consultas otimizadas

O sistema foi projetado para ser **escalável, seguro e acessível**, proporcionando ao gestor a capacidade de tomar decisões com dados reais, não achismos.

---

## 🛠 Estrutura de pastas

-Raiz<br>
|<br>
|-->documentos<br>
  &emsp;|-->Entrega 1<br>
    &emsp;|-->Algebra Linear, Vetores e Geometria Analitica<br>
    &emsp;|-->Inteligencia Artificial e Aprendizado de Maquina<br>
    &emsp;|-->Projeto Interdisciplinar | Inteligencia Artificial<br>
    &emsp;|-->Psicologia, Liderança e Soft Skills<br>
    &emsp;|-->Sistemas Operacionais e Computação em Nuvem<br>
  &emsp;|-->Entrega 2<br>
    &emsp;|-->Algebra Linear, Vetores e Geometria Analitica<br>
    &emsp;|-->Inteligencia Artificial e Aprendizado de Maquina<br>
    &emsp;|-->Projeto Interdisciplinar | Inteligencia Artificial<br>
    &emsp;|-->Psicologia, Liderança e Soft Skills<br>
    &emsp;|-->Sistemas Operacionais e Computação em Nuvem<br>
  &emsp;|Documento - Projeto de Extensão - COM Empresa.docx<br>
  &emsp;|readme.md<br>
|-->executáveis<br>
  &emsp;|-->windows<br>
  &emsp;|-->android<br>
  &emsp;|-->HTML<br>
|-->imagens<br>
|-->src<br>
  &emsp;|-->Entrega 1<br>
    &emsp;|-->assets<br>
    &emsp;|-->Backend<br>
    &emsp;|-->Frontend<br>
  &emsp;|-->Entrega 2<br>
    &emsp;|-->Backend<br>
    &emsp;|-->Frontend<br>
|.gitignore<br>
|readme.md<br>


---

## 🏗 Tecnologias Utilizadas

| Camada | Ferramentas |
|-------|-------------|
| Front-End | Next.js 14 (App Router), React, TailwindCSS |
| Back-End | Next.js API Routes + Prisma ORM |
| Banco de Dados | PostgreSQL (Docker) |
| Geração de Dados | Python + Faker |
| Clusterização | Jupyter Notebook + Scikit-Learn |

## **Arquitetura Resumida**
Next.js (Front-End e API)
↓ Prisma
PostgreSQL (Docker)
↑ Dados Sintéticos (Python)
Jupyter Notebook (Clusterização)
---

## **Banco de Dados**

> **Banco executado localmente via Docker.**

### Iniciar o banco: dentro do diretório "fakedata", rode: 
```sh
docker compose up --build
```
### Acessar o banco
```sh
docker exec -it fakedata-db-1 psql -U postgres -d datalivery
```

## 💻 Configuração para Desenvolvimento

### Pré-requisitos:
- Node.js LTS
- Docker Desktop

### Variável de execução (usada pelo prisma):
Crie `.env` na pasta  `dashboard` com o seguinte código:
```sh
DATABASE_URL="postgresql://postgres:1234@localhost:5432/datalivery"
```

## 📋 Licença/License
Este projeto está licenciado sob a licença CC BY 4.0.
Você pode criar a sua própria licença Creative Commons em: https://chooser-beta.creativecommons.org/

## 🎓 Referências

Aqui estão as referências usadas no projeto:


