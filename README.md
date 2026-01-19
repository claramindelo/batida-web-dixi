# 🕐 Sistema de Batida de Ponto - Dixi Soluções

Sistema web de registro e controle de ponto eletrônico desenvolvido com React, permitindo marcação com ou sem foto, validação de localização e histórico completo de registros.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para vaga de desenvolvimento web. O sistema permite que funcionários registrem seus pontos de entrada e saída, com recursos avançados de validação e rastreamento.

## ✨ Funcionalidades

### ✅ Requisitos Obrigatórios Implementados

- **Marcação de Ponto com Validações**
  - Intervalo mínimo de 1 minuto entre registros
  - Marcações fora do intervalo são automaticamente desconsideradas
  - Registro com data e hora precisos

- **Sistema de Fotografia**
  - Opção de registrar ponto com ou sem foto
  - Preview da foto antes de confirmar
  - Possibilidade de tirar nova foto
  - Moldura de enquadramento facial

- **Histórico Completo**
  - Visualização de todas as marcações aprovadas
  - Aba separada para marcações desconsideradas
  - Filtro por data (período)
  - Visualização de fotos das marcações
  - Persistência de dados com localStorage

- **Validações e Tratamento de Erros**
  - Validação de permissões de câmera
  - Validação obrigatória de localização (GPS)
  - Mensagens claras de erro
  - Tratamento de casos de borda

### 🎯 Diferenciais Implementados

- **Geolocalização**
  - Captura automática de latitude e longitude
  - Validação obrigatória de localização
  - Visualização no Google Maps (clique no ícone de pin)
  - Registro de localização mesmo em marcações desconsideradas

- **Interface Moderna**
  - Design responsivo e intuitivo
  - Sidebar com perfil do funcionário
  - Modal de confirmação antes do registro
  - Feedback visual em tempo real
  - Animações suaves

- **Dados Mockados**
  - Perfil de funcionário (Clara Mindelo - Dixi Soluções)
  - Matrícula: 1001
  - Pronto para integração com backend

## 🛠️ Tecnologias Utilizadas

- **React** 18.x - Biblioteca principal
- **JavaScript (ES6+)** - Linguagem de programação
- **CSS3** - Estilização
- **Lucide React** - Biblioteca de ícones
- **React Webcam** - Captura de fotos
- **Geolocation API** - Captura de localização
- **LocalStorage** - Persistência de dados no navegador

## 📁 Estrutura do Projeto
```
batida-web-dixi/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── BaterPonto.jsx
│   │   └── HistoricoPonto.jsx
│   ├── styles/
│   │   ├── BaterPonto.css
│   │   ├── Header.css
│   │   ├── HistoricoPonto.css
│   │   └── Sidebar.css
│   ├── PontoContext.jsx
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/claramindelo/batida-web-dixi.git
```

2. Entre na pasta do projeto
```bash
cd batida-web-dixi
```

3. Instale as dependências
```bash
npm install
```

4. Execute o projeto
```bash
npm start
```

5. Acesse no navegador
```
http://localhost:3000
```

### ⚠️ Permissões Necessárias

Para o funcionamento completo do sistema, é necessário:
- ✅ Permitir acesso à **câmera** (para marcações com foto)
- ✅ Permitir acesso à **localização** (obrigatório para todos os registros)

## 📸 Funcionalidades Detalhadas

### Marcação de Ponto

1. **Sem Foto**
   - Clique em "Registrar Ponto"
   - Confirme no modal de prévia
   - Sistema captura data, hora e localização automaticamente

2. **Com Foto**
   - Ative o toggle "Tirar Foto para Bater Ponto"
   - Centralize o rosto na moldura
   - Clique em "Capturar Foto"
   - Confirme ou tire nova foto
   - Clique em "Usar essa foto"
   - Confirme no modal de prévia

### Regras de Validação

- **Intervalo mínimo:** 1 minuto entre registros
- **Localização:** Obrigatória (bloqueia registro se não disponível)
- **Câmera:** Opcional, mas requer permissão se ativada

### Histórico de Ponto

- **Marcação Apropriada:** Registros válidos com data, hora, foto (quando houver) e localização
- **Marcações Desconsideradas:** Registros bloqueados por proximidade temporal
- **Filtros:** Pesquisa por período (data inicial e final)
- **Visualização:** 
  - Ícone de câmera azul = tem foto (clique para ver)
  - Ícone de câmera cinza = sem foto
  - Ícone de pin verde = ver localização no mapa
  - Ícone de pin cinza = localização não disponível

## 👤 Funcionário Mockado
```
Nome: Clara Mindelo
Empresa: Dixi Soluções
Matrícula: 1001
```

## 🔄 Próximos Passos (Backend)

- [ ] API REST com Java/Spring Boot
- [ ] Banco de dados MySQL
- [ ] Autenticação de usuários
- [ ] CRUD completo de funcionários
- [ ] Testes automatizados (unitários e/ou integração) e/ou containerização 

## 📝 Observações

- Os dados são armazenados localmente no navegador (localStorage)
- Para limpar o histórico: abra o Console (F12) e digite `localStorage.clear()`
- O sistema valida permissões e mostra mensagens claras de erro

## 👩‍💻 Desenvolvido por

**[CLARA MINDELO]**

Projeto desenvolvido como parte do desafio técnico para vaga de desenvolvimento web.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!