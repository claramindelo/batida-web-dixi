// Importando os componentes criados
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BaterPonto from './pages/BaterPonto';
import HistoricoPonto from './pages/HistoricoPonto';

function App() {
  // Estado para controlar qual página está ativa
  const [currentPage, setCurrentPage] = useState('bater-ponto');

  // Função para renderizar a página correta
  const renderPage = () => {
    switch (currentPage) {
      case 'bater-ponto':
        return <BaterPonto />;
      case 'historico':
        return <HistoricoPonto />;
      default:
        return <BaterPonto />;
    }
  };

  return (
    <div className="App">
      {/* Sidebar fixo na esquerda */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Header com data e hora - APENAS na página Bater Ponto */}
        {currentPage === 'bater-ponto' && <Header />}
        
        {/* Página atual */}
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;