// Importando React, hooks e ícones
import React, { useState } from 'react';
import { Search, X, Camera, CameraOff, AlertTriangle, XCircle, MapPin } from 'lucide-react';
import { usePonto } from '../PontoContext';
import '../styles/HistoricoPonto.css';

function HistoricoPonto() {
  const { registros, registrosDesconsiderados } = usePonto();

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('aprovadas');
  const [registrosFiltrados, setRegistrosFiltrados] = useState(registros);
  const [desconsideradosFiltrados, setDesconsideradosFiltrados] = useState(registrosDesconsiderados);
  const [fotoVisualizacao, setFotoVisualizacao] = useState(null);

  React.useEffect(() => {
    setRegistrosFiltrados(registros);
  }, [registros]);

  React.useEffect(() => {
    setDesconsideradosFiltrados(registrosDesconsiderados);
  }, [registrosDesconsiderados]);

  const handlePesquisar = () => {
    if (!dataInicial && !dataFinal) {
      if (abaAtiva === 'aprovadas') {
        setRegistrosFiltrados(registros);
      } else {
        setDesconsideradosFiltrados(registrosDesconsiderados);
      }
      return;
    }

    if (abaAtiva === 'aprovadas') {
      const filtrados = registros.filter(registro => {
        const [dia, mes, ano] = registro.data.split('/');
        const dataRegistro = new Date(ano, mes - 1, dia);
        let dentroDoIntervalo = true;

        if (dataInicial) {
          const dataIni = new Date(dataInicial);
          dentroDoIntervalo = dentroDoIntervalo && dataRegistro >= dataIni;
        }

        if (dataFinal) {
          const dataFim = new Date(dataFinal);
          dentroDoIntervalo = dentroDoIntervalo && dataRegistro <= dataFim;
        }

        return dentroDoIntervalo;
      });

      setRegistrosFiltrados(filtrados);
    } else {
      const filtrados = registrosDesconsiderados.filter(registro => {
        const [dia, mes, ano] = registro.data.split('/');
        const dataRegistro = new Date(ano, mes - 1, dia);
        let dentroDoIntervalo = true;

        if (dataInicial) {
          const dataIni = new Date(dataInicial);
          dentroDoIntervalo = dentroDoIntervalo && dataRegistro >= dataIni;
        }

        if (dataFinal) {
          const dataFim = new Date(dataFinal);
          dentroDoIntervalo = dentroDoIntervalo && dataRegistro <= dataFim;
        }

        return dentroDoIntervalo;
      });

      setDesconsideradosFiltrados(filtrados);
    }
  };

  const handleLimparFiltros = () => {
    setDataInicial('');
    setDataFinal('');
    setRegistrosFiltrados(registros);
    setDesconsideradosFiltrados(registrosDesconsiderados);
  };

  const abrirFoto = (foto) => {
    setFotoVisualizacao(foto);
  };

  const fecharFoto = () => {
    setFotoVisualizacao(null);
  };

  return (
    <div className="historico-page">
      <h1 className="page-title">Histórico de Ponto</h1>
      <p className="page-subtitle">Veja os pontos registrados no sistema</p>

      <div className="tabs-container">
        <button 
          className={`tab-button ${abaAtiva === 'aprovadas' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('aprovadas')}
        >
          <Camera size={18} />
          Marcação Apropriada
          <span className="tab-count">({registros.length})</span>
        </button>
        <button 
          className={`tab-button ${abaAtiva === 'desconsideradas' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('desconsideradas')}
        >
          <XCircle size={18} />
          Marcação Desconsiderada
          <span className="tab-count">({registrosDesconsiderados.length})</span>
        </button>
      </div>

      <div className="filters-section">
        <div className="filter-inputs">
          <div className="filter-group">
            <label>Data Inicial *</label>
            <input 
              type="date" 
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="date-input"
            />
          </div>

          <div className="filter-group">
            <label>Data Final *</label>
            <input 
              type="date" 
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={handlePesquisar} className="btn-search">
            <Search size={18} />
            Pesquisar
          </button>
          <button onClick={handleLimparFiltros} className="btn-clear">
            Limpar
          </button>
        </div>
      </div>

      {abaAtiva === 'aprovadas' ? (
        <div className="table-container">
          {registrosFiltrados.length > 0 ? (
            <table className="historico-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Marcações</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.map((registro) => (
                  <tr key={registro.id}>
                    <td className="data-cell">{registro.data}</td>
                    <td className="horarios-cell">
                      {registro.horarios.length === 0 ? (
                        <span className="sem-marcacao">
                          Nenhuma marcação feita nesse dia
                        </span>
                      ) : (
                        <div className="horarios-list">
                          {registro.horarios.map((item, index) => (
                            <div key={index} className="horario-item">
                              <span className="horario-badge">{item.hora}</span>
                              
                              {item.foto ? (
                                <button 
                                  onClick={() => abrirFoto(item.foto)}
                                  className="btn-ver-foto-mini"
                                  title="Ver foto desta marcação"
                                >
                                  <Camera size={16} />
                                </button>
                              ) : (
                                <div className="sem-foto-mini" title="Marcação sem foto">
                                  <CameraOff size={16} color="#94a3b8" />
                                </div>
                              )}
                              
                              {item.latitude && item.longitude ? (
                                <a
                                  href={"https://www.google.com/maps?q=" + item.latitude + "," + item.longitude}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-ver-localizacao-mini"
                                  title="Ver localização no mapa"
                                >
                                  <MapPin size={16} />
                                </a>
                              ) : (
                                <div className="sem-localizacao-mini" title="Localização não disponível">
                                  <MapPin size={16} color="#94a3b8" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <AlertTriangle size={64} color="#94a3b8" strokeWidth={1.5} />
              <p>Nenhuma marcação encontrada</p>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          {desconsideradosFiltrados.length > 0 ? (
            <table className="historico-table desconsideradas-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Motivo</th>
                  <th>Foto</th>
                  <th>Localização</th>
                </tr>
              </thead>
              <tbody>
                {desconsideradosFiltrados.map((registro) => (
                  <tr key={registro.id}>
                    <td className="data-cell">{registro.data}</td>
                    <td className="hora-cell">{registro.hora}</td>
                    <td className="motivo-cell">
                      <span className="badge-desconsiderado">
                        <XCircle size={16} />
                        {registro.motivo}
                      </span>
                    </td>
                    <td className="foto-cell-desc">
                      {registro.foto ? (
                        <button 
                          onClick={() => abrirFoto(registro.foto)}
                          className="btn-ver-foto-mini"
                          title="Ver foto"
                        >
                          <Camera size={16} />
                        </button>
                      ) : (
                        <div className="sem-foto-mini" title="Sem foto">
                          <CameraOff size={16} color="#94a3b8" />
                        </div>
                      )}
                    </td>
                    <td className="foto-cell-desc">
                      {registro.latitude && registro.longitude ? (
                        <a
                          href={"https://www.google.com/maps?q=" + registro.latitude + "," + registro.longitude}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ver-localizacao-mini"
                          title="Ver localização no mapa"
                        >
                          <MapPin size={16} />
                        </a>
                      ) : (
                        <div className="sem-localizacao-mini" title="Localização não disponível">
                          <MapPin size={16} color="#94a3b8" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <AlertTriangle size={64} color="#94a3b8" strokeWidth={1.5} />
              <p>Nenhuma marcação desconsiderada encontrada</p>
            </div>
          )}
        </div>
      )}

      {fotoVisualizacao && (
        <div className="modal-overlay" onClick={fecharFoto}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={fecharFoto}>
              <X size={20} />
            </button>
            <h3 className="modal-title">Foto da Marcação</h3>
            <img 
              src={fotoVisualizacao} 
              alt="Foto da marcação" 
              className="modal-foto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoricoPonto;