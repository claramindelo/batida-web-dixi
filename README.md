# Sistema de Batida de Ponto - Dixi Soluções

Sistema web de registro e controle de ponto eletrônico desenvolvido com React e Spring Boot, permitindo marcação com ou sem foto, validação de localização e histórico completo de registros.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para vaga de desenvolvimento web. O sistema permite que funcionários registrem seus pontos de entrada e saída, com recursos avançados de validação e rastreamento.

## 🏗️ Arquitetura

O projeto é dividido em duas partes:

- **Frontend (este repositório)**: Interface React para interação do usuário
- **Backend**: API REST Spring Boot - [batida-ponto-api](https://github.com/claramindelo/batida-ponto-api)

## ✨ Funcionalidades

### ✅ Requisitos Obrigatórios Implementados

#### Marcação de Ponto com Validações
- Intervalo mínimo de 1 minuto entre registros (validado no backend)
- Marcações fora do intervalo são automaticamente desconsideradas
- **Data e hora do servidor** - impossível fraudar alterando o relógio do computador
- Validação de localização obrigatória

#### Sistema de Fotografia
- Opção de registrar ponto com ou sem foto
- Preview da foto antes de confirmar
- Possibilidade de tirar nova foto
- Moldura de enquadramento facial
- Foto armazenada em base64

#### Histórico Completo
- Visualização de todas as marcações aprovadas
- Aba separada para marcações desconsideradas
- Filtro por data (período)
- Visualização de fotos das marcações
- Persistência de dados via API REST

#### Validações e Tratamento de Erros
- Validação de permissões de câmera
- Validação obrigatória de localização (GPS)
- Mensagens claras de erro
- Tratamento de casos de borda

### 🎯 Diferenciais Implementados

#### Geolocalização
- Captura automática de latitude e longitude
- Validação obrigatória de localização
- Visualização no Google Maps (clique no ícone de pin)
- Registro de localização mesmo em marcações desconsideradas

#### Integração com Backend
- Comunicação REST API com Spring Boot
- **Hora do servidor** (segurança anti-fraude)
- Sincronização automática de dados
- Tratamento robusto de erros de rede

#### Interface Moderna
- Design responsivo e intuitivo
- Sidebar com perfil do funcionário
- Modal de confirmação antes do registro
- Feedback visual em tempo real
- Animações suaves

#### Dados Mockados
- Perfil de funcionário (Clara Mindelo - Dixi Soluções)
- Matrícula: 1001
- Pronto para integração com sistema de autenticação

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.x** - Biblioteca principal
- **JavaScript (ES6+)** - Linguagem de programação
- **CSS3** - Estilização
- **Lucide React** - Biblioteca de ícones
- **React Webcam** - Captura de fotos
- **Geolocation API** - Captura de localização
- **Fetch API** - Comunicação com backend

### Backend
- **Java 21** - Linguagem de programação
- **Spring Boot 4.1.0** - Framework
- **Maven** - Gerenciador de dependências
- **Lombok** - Redução de boilerplate
- Repositório: [batida-ponto-api](https://github.com/claramindelo/batida-ponto-api)

## 📁 Estrutura do Projeto
```
batida-web-dixi/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com data/hora
│   │   └── Sidebar.jsx         # Menu lateral com navegação
│   ├── pages/
│   │   ├── BaterPonto.jsx      # Página de registro de ponto
│   │   └── HistoricoPonto.jsx  # Página de histórico
│   ├── styles/
│   │   ├── BaterPonto.css
│   │   ├── Header.css
│   │   ├── HistoricoPonto.css
│   │   └── Sidebar.css
│   ├── PontoContext.jsx        # Context API - integração com backend
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **Backend rodando** - [Instruções aqui](https://github.com/claramindelo/batida-ponto-api)

### Instalação

#### 1. Clone o repositório
```bash
git clone https://github.com/claramindelo/batida-web-dixi.git
cd batida-web-dixi
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure a URL do backend (opcional)

O frontend está configurado para acessar o backend em `http://localhost:8080`.

Se seu backend estiver em outra URL, edite o arquivo `src/PontoContext.jsx`:
```javascript
const API_URL = 'http://localhost:8080/api/ponto'; // Altere aqui se necessário
```

#### 4. Inicie o backend

Certifique-se de que o backend está rodando na porta 8080. [Veja como](https://github.com/claramindelo/batida-ponto-api)

#### 5. Execute o frontend
```bash
npm start
```

#### 6. Acesse no navegador
```
http://localhost:3000
```

## ⚠️ Permissões Necessárias

Para o funcionamento completo do sistema, é necessário:

✅ **Permitir acesso à câmera** (para marcações com foto)

✅ **Permitir acesso à localização** (obrigatório para todos os registros)


## 🌐 API Endpoints Consumidos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/ponto/registrar` | Registra novo ponto |
| `POST` | `/api/ponto/desconsiderado` | Registra marcação desconsiderada |
| `GET` | `/api/ponto/registros` | Lista todos os registros |
| `GET` | `/api/ponto/desconsiderados` | Lista desconsiderados |
| `GET` | `/api/ponto/filtrar?dataInicial=&dataFinal=` | Filtra por período |

## 📝 Observações

- O backend armazena dados **em memória (RAM)**
- Ao reiniciar o servidor backend, os dados são perdidos
- Para produção, é recomendado adicionar um banco de dados
- O sistema valida permissões e mostra mensagens claras de erro

## 🐛 Troubleshooting

### Erro de CORS
Certifique-se de que o backend está com CORS habilitado para `http://localhost:3000`

### Backend não encontrado
Verifique se o backend está rodando em `http://localhost:8080`

## 👩‍💻 Desenvolvido por

**Clara Mindelo**

Projeto desenvolvido como parte do desafio técnico para vaga de desenvolvimento web.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
