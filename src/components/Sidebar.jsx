// Importando React e os ícones
import React from 'react';
import { Clock, FileText, User } from 'lucide-react'; // Importa os ícones
import '../styles/Sidebar.css';

// Recebendo as props currentPage e setCurrentPage do App.js
function Sidebar({ currentPage, setCurrentPage }) {
  
  // Dados mockados do funcionário
  const funcionario = {
    nome: 'Clara Mindelo',
    empresa: 'Dixi Soluções',
    matricula: '1001'
  };
  
  // Função para mudar de página
  const handleNavigation = (page) => {
    setCurrentPage(page); // Atualiza o estado no App.js
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Dixi Logo" className="logo-image" />
      </div>
      
      {/* Menu de navegação */}
      <nav className="sidebar-nav">
        {/* Item: Bater Ponto */}
        <div 
          onClick={() => handleNavigation('bater-ponto')}
          className={`nav-item ${currentPage === 'bater-ponto' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <Clock size={24} /> {/* Ícone de relógio */}
          </div>
          <span>Bater Ponto</span>
        </div>
        
        {/* Item: Histórico de Ponto */}
        <div 
          onClick={() => handleNavigation('historico')}
          className={`nav-item ${currentPage === 'historico' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <FileText size={24} /> {/* Ícone de documento */}
          </div>
          <span>Histórico de Ponto</span>
        </div>
      </nav>

      {/* Perfil do usuário na parte inferior */}
      <div className="sidebar-profile">
        {/* Foto de perfil (ícone) */}
        <div className="profile-avatar">
          <User size={32} strokeWidth={1.5} />
        </div>
        
        {/* Informações do usuário */}
        <div className="profile-info">
          <div className="profile-name">Funcionário: {funcionario.nome}</div>
          <div className="profile-company">Empresa: {funcionario.empresa}</div>
          <div className="profile-matricula">Matrícula: {funcionario.matricula}</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;