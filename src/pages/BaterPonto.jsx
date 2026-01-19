// Importando React, hooks, ícones e Webcam
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, CameraOff, Check, RotateCcw, Clock, AlertCircle, X } from 'lucide-react';
import { usePonto } from '../PontoContext';
import '../styles/BaterPonto.css';

function BaterPonto() {
  // Pegando as funções do contexto
  const { adicionarRegistro, adicionarRegistroDesconsiderado } = usePonto();
  
  // Estado para armazenar a foto capturada
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  
  // Estado para controlar se o usuário quer tirar foto
  const [wantPhoto, setWantPhoto] = useState(false);
  
  // Estado para mostrar mensagens de sucesso/erro
  const [message, setMessage] = useState(null);
  
  // Estado para armazenar o último horário de registro
  const [lastPunchTime, setLastPunchTime] = useState(null);
  
  // Estado para controlar o modal de prévia
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Estado para controlar erro de permissão da câmera
  const [cameraError, setCameraError] = useState(false);
  
  // Referência para a webcam
  const webcamRef = useRef(null);

  // Configurações da webcam
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  // Função para capturar a foto da câmera
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedPhoto(imageSrc);
    }
  };

  // Função para descartar a foto e tirar outra
  const retakePhoto = () => {
    setCapturedPhoto(null);
    setMessage(null);
  };

  // Função para abrir o modal de prévia
  const handleOpenPreview = () => {
    setShowPreviewModal(true);
  };

  // Função para cancelar o registro
  const handleCancelPreview = () => {
    setShowPreviewModal(false);
  };

  // Função para registrar o ponto (chamada após confirmação no modal)
  const handleConfirmPunch = async () => {
    const now = new Date();
    
    let latitude = null;
    let longitude = null;
    
    // Tenta obter a localização (OBRIGATÓRIO)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
      
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      
      // Se não conseguir a localização, BLOQUEIA o registro
      setMessage({
        type: 'error',
        text: 'Não foi possível obter sua localização. Por favor, habilite as permissões de localização no navegador e tente novamente.'
      });
      
      setShowPreviewModal(false);
      setCapturedPhoto(null);
      setWantPhoto(false);
      
      // NÃO registra o ponto
      return;
    }
    
    // Se chegou aqui, a localização foi obtida com sucesso
    // Verifica o intervalo mínimo de 1 minuto
    if (lastPunchTime) {
      const diffInSeconds = (now - lastPunchTime) / 1000;
      
      if (diffInSeconds < 60) {
        adicionarRegistroDesconsiderado({
          time: now,
          motivo: 'Marcação desconsiderada por proximidade',
          photo: capturedPhoto,
          latitude: latitude,
          longitude: longitude
        });
        
        setMessage({
          type: 'error',
          text: 'Marcação desconsiderada por proximidade. Aguarde 1 minuto entre registros.',
          time: now
        });
        
        setShowPreviewModal(false);
        setCapturedPhoto(null);
        setWantPhoto(false);
        return;
      }
    }

    // Registra o ponto com sucesso (com localização obrigatória)
    setLastPunchTime(now);
    
    adicionarRegistro({
      time: now,
      photo: capturedPhoto,
      latitude: latitude,
      longitude: longitude
    });
    
    setMessage({
      type: 'success',
      text: 'Ponto registrado com sucesso!',
      time: now,
      photo: capturedPhoto
    });

    setShowPreviewModal(false);
    setCapturedPhoto(null);
    setWantPhoto(false);
  };

  // Função para alternar o toggle de foto
  const handleTogglePhoto = (checked) => {
    setWantPhoto(checked);
    
    if (!checked) {
      setCapturedPhoto(null);
      setCameraError(false);
    }
  };

  return (
    <div className="bater-ponto-page">
      <h1 className="page-title">Bater Ponto</h1>
      <p className="page-subtitle">Registre o ponto no sistema.</p>

      <div className="content-wrapper">
        <div className="camera-section">
          {/* Estado: Foto desabilitada */}
          {!wantPhoto && (
            <div className="no-camera">
              <Camera size={80} strokeWidth={1.5} color="#94a3b8" />
              <p>Foto Desabilitada</p>
            </div>
          )}

          {/* Estado: Foto habilitada */}
          {wantPhoto && !capturedPhoto && (
            <>
              {/* Se houver erro de permissão da câmera */}
              {cameraError ? (
                <div className="camera-permission">
                  <CameraOff size={80} strokeWidth={1.5} color="#ef4444" />
                  <p>Não foi possível acessar a webcam!</p>
                  <p className="permission-hint">
                    Para ativar a câmera, clique no ícone de câmera/cadeado na barra de endereço do navegador e permita o acesso à câmera.
                  </p>
                  <button onClick={() => window.location.reload()} className="btn-permission">
                    Recarregar Página
                  </button>
                </div>
              ) : (
                /* Se a câmera está funcionando */
                <div className="camera-preview">
                  <p className="camera-instruction">
                    Centralize o rosto na moldura para tirar a foto.
                  </p>
                  <div className="video-container">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="video-feed"
                      mirrored={true}
                      onUserMediaError={() => setCameraError(true)}
                      onUserMedia={() => setCameraError(false)}
                    />
                    <div className="face-frame"></div>
                  </div>
                  <button onClick={capturePhoto} className="btn-capture">
                    <Camera size={20} />
                    Capturar Foto
                  </button>
                </div>
              )}
            </>
          )}

          {/* Estado: Foto capturada */}
          {capturedPhoto && (
            <div className="photo-preview">
              <img src={capturedPhoto} alt="Foto capturada" />
              <div className="photo-actions">
                <button onClick={handleOpenPreview} className="btn-use-photo">
                  <Check size={20} />
                  Usar essa foto
                </button>
                <button onClick={retakePhoto} className="btn-retake">
                  <RotateCcw size={20} />
                  Tirar nova foto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Painel lateral direito */}
        <div className="side-panel">
          {/* Toggle para ativar/desativar foto */}
          <div className="toggle-section">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={wantPhoto}
                onChange={(e) => handleTogglePhoto(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Tirar Foto para Bater Ponto</span>
            </label>
          </div>

          {/* Botão de registrar ponto (sem foto) */}
          {!wantPhoto && (
            <button onClick={handleOpenPreview} className="btn-register">
              <Clock size={20} />
              Registrar Ponto
            </button>
          )}

          {/* Área de mensagens de sucesso/erro */}
          {message && (
            <div className={`message-box ${message.type}`}>
              <h3>
                {message.type === 'success' ? (
                  <>
                    <Check size={20} /> Sucesso!
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} /> Atenção!
                  </>
                )}
              </h3>
              <p>{message.text}</p>
              
              {message.time && (
                <div className="message-details">
                  <p><strong>Data:</strong> {message.time.toLocaleDateString('pt-BR')}</p>
                  <p><strong>Hora:</strong> {message.time.toLocaleTimeString('pt-BR')}</p>
                </div>
              )}
              
              {message.photo && (
                <div className="message-photo">
                  <img src={message.photo} alt="Foto do registro" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Prévia da Marcação */}
      {showPreviewModal && (
        <div className="preview-modal-overlay">
          <div className="preview-modal-content">
            <button className="preview-modal-close" onClick={handleCancelPreview}>
              <X size={20} />
            </button>
            
            <h2 className="preview-modal-title">Prévia da Marcação</h2>
            
            {capturedPhoto && (
              <div className="preview-photo-container">
                <img src={capturedPhoto} alt="Prévia da foto" className="preview-photo" />
              </div>
            )}
            
            <div className="preview-info">
              <div className="preview-info-row">
                <Clock size={20} color="#2563eb" />
                <div>
                  <strong>Data e Hora</strong>
                  <p>{new Date().toLocaleDateString('pt-BR')} - {new Date().toLocaleTimeString('pt-BR')}</p>
                </div>
              </div>
            </div>
            
            <p className="preview-question">Você deseja registrar esse ponto?</p>
            
            <div className="preview-actions">
              <button onClick={handleCancelPreview} className="btn-preview-cancel">
                <X size={20} />
                {capturedPhoto ? 'Tirar Outra Foto' : 'Cancelar'}
              </button>
              <button onClick={handleConfirmPunch} className="btn-preview-confirm">
                <Check size={20} />
                Registrar Ponto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BaterPonto;