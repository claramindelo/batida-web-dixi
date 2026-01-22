import React, { createContext, useContext, useState, useEffect } from 'react';

const PontoContext = createContext();

export const usePonto = () => {
  const context = useContext(PontoContext);
  if (!context) {
    throw new Error('usePonto deve ser usado dentro de um PontoProvider');
  }
  return context;
};

export const PontoProvider = ({ children }) => {
  const [registros, setRegistros] = useState([]);
  const [registrosDesconsiderados, setRegistrosDesconsiderados] = useState([]);

  const API_URL = 'http://localhost:8080/api/ponto';

  // Carrega os dados do backend quando o componente monta
  useEffect(() => {
    carregarRegistros();
    carregarDesconsiderados();
  }, []);

  const carregarRegistros = async () => {
    try {
      const response = await fetch(`${API_URL}/registros`);
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  const carregarDesconsiderados = async () => {
    try {
      const response = await fetch(`${API_URL}/desconsiderados`);
      const data = await response.json();
      setRegistrosDesconsiderados(data);
    } catch (error) {
      console.error('Erro ao carregar desconsiderados:', error);
    }
  };

  const adicionarRegistro = async (novoRegistro) => {
    try {
      const payload = {
        // NÃO envia dataHora - o servidor usa LocalDateTime.now()
        foto: novoRegistro.photo || null,
        latitude: novoRegistro.latitude,
        longitude: novoRegistro.longitude
      };

      const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Ponto registrado no servidor às:', data.dataHoraServidor);
        // Recarrega os registros após adicionar
        await carregarRegistros();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar registro:', error);
      throw error;
    }
  };

  const adicionarRegistroDesconsiderado = async (registroDesconsiderado) => {
    try {
      const payload = {
        // NÃO envia dataHora
        motivo: registroDesconsiderado.motivo || 'Marcação desconsiderada por proximidade',
        foto: registroDesconsiderado.photo || null,
        latitude: registroDesconsiderado.latitude,
        longitude: registroDesconsiderado.longitude
      };

      const response = await fetch(`${API_URL}/desconsiderado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        console.log('⚠️ Marcação desconsiderada no servidor às:', data.dataHoraServidor);
        // Recarrega os desconsiderados após adicionar
        await carregarDesconsiderados();
      }
    } catch (error) {
      console.error('Erro ao adicionar desconsiderado:', error);
    }
  };

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
