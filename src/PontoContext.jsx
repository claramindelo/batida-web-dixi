// Importando React e hooks
import React, { createContext, useContext, useState, useEffect } from 'react';

// Criando o contexto
const PontoContext = createContext();

// Hook customizado para usar o contexto facilmente
export const usePonto = () => {
  const context = useContext(PontoContext);
  if (!context) {
    throw new Error('usePonto deve ser usado dentro de um PontoProvider');
  }
  return context;
};

// Provider que vai envolver toda a aplicação
export const PontoProvider = ({ children }) => {
  // Função para carregar dados do localStorage
  const carregarRegistros = () => {
    try {
      const registrosSalvos = localStorage.getItem('registrosPonto');
      return registrosSalvos ? JSON.parse(registrosSalvos) : [];
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
      return [];
    }
  };

  const carregarDesconsiderados = () => {
    try {
      const desconsideradosSalvos = localStorage.getItem('registrosDesconsiderados');
      return desconsideradosSalvos ? JSON.parse(desconsideradosSalvos) : [];
    } catch (error) {
      console.error('Erro ao carregar desconsiderados:', error);
      return [];
    }
  };

  // Estado que armazena todos os registros de ponto
  const [registros, setRegistros] = useState(carregarRegistros);
  
  // Estado que armazena as marcações desconsideradas
  const [registrosDesconsiderados, setRegistrosDesconsiderados] = useState(carregarDesconsiderados);

  // Salvar registros no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('registrosPonto', JSON.stringify(registros));
    } catch (error) {
      console.error('Erro ao salvar registros:', error);
    }
  }, [registros]);

  // Salvar desconsiderados no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('registrosDesconsiderados', JSON.stringify(registrosDesconsiderados));
    } catch (error) {
      console.error('Erro ao salvar desconsiderados:', error);
    }
  }, [registrosDesconsiderados]);

  // Função para adicionar um novo registro
  const adicionarRegistro = (novoRegistro) => {
    // Formata a data (DD/MM/YYYY)
    const dataFormatada = novoRegistro.time.toLocaleDateString('pt-BR');
    
    // Formata a hora (HH:MM)
    const horaFormatada = novoRegistro.time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Verifica se já existe um registro para essa data
    const registroExistente = registros.find(r => r.data === dataFormatada);

    if (registroExistente) {
      // Se já existe, adiciona o horário com sua respectiva foto e localização ao array
      setRegistros(registros.map(r => 
        r.data === dataFormatada 
          ? { 
              ...r, 
              horarios: [
                ...r.horarios, 
                {
                  hora: horaFormatada,
                  foto: novoRegistro.photo || null,
                  latitude: novoRegistro.latitude || null,
                  longitude: novoRegistro.longitude || null
                }
              ]
            }
          : r
      ));
    } else {
      // Se não existe, cria um novo registro
      const novoReg = {
        id: Date.now(), // Usa timestamp como ID único
        data: dataFormatada,
        horarios: [
          {
            hora: horaFormatada,
            foto: novoRegistro.photo || null,
            latitude: novoRegistro.latitude || null,
            longitude: novoRegistro.longitude || null
          }
        ]
      };
      
      // Adiciona no início do array (mais recente primeiro)
      setRegistros([novoReg, ...registros]);
    }
  };

  // Função para adicionar um registro desconsiderado
  const adicionarRegistroDesconsiderado = (registroDesconsiderado) => {
    // Formata a data (DD/MM/YYYY)
    const dataFormatada = registroDesconsiderado.time.toLocaleDateString('pt-BR');
    
    // Formata a hora (HH:MM:SS) - com segundos para ser mais específico
    const horaFormatada = registroDesconsiderado.time.toLocaleTimeString('pt-BR');

    // Cria o registro desconsiderado
    const novoDesconsiderado = {
      id: Date.now(),
      data: dataFormatada,
      hora: horaFormatada,
      motivo: registroDesconsiderado.motivo || 'Marcação desconsiderada por proximidade',
      foto: registroDesconsiderado.photo || null,
      latitude: registroDesconsiderado.latitude || null,
      longitude: registroDesconsiderado.longitude || null
    };

    // Adiciona no início do array (mais recente primeiro)
    setRegistrosDesconsiderados([novoDesconsiderado, ...registrosDesconsiderados]);
  };

  // Valores que serão compartilhados com toda a aplicação
  const value = {
    registros,
    registrosDesconsiderados,
    adicionarRegistro,
    adicionarRegistroDesconsiderado
  };

  return (
    <PontoContext.Provider value={value}>
      {children}
    </PontoContext.Provider>
  );
};