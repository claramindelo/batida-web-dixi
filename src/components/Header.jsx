import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return { dayName, fullDate: `${day} / ${month} / ${year}` };
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return { hours, minutes, seconds };
  };

  const { dayName, fullDate } = formatDate(currentTime);
  const { hours, minutes, seconds } = formatTime(currentTime);

  return (
    <div className="header">
      <div className="header-date">
        <div className="day-name">{dayName}</div>
        <div className="time-display">
          <span className="time-large">{hours} : {minutes}</span>
          <span className="time-seconds">{seconds}</span>
        </div>
        <div className="full-date">{fullDate}</div>
        <div className="server-info">
          A data e hora serão registrados no sistema ao realizar a marcação.
        </div>
      </div>
    </div>
  );
}

export default Header;