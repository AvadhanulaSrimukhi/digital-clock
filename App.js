import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Digital clock values
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Analog clock values
  const secondDeg = time.getSeconds() * 6;
  const minuteDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hourDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  // Generate numbers 1-12
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="app">
      <h1>Digital & Analog Clock</h1>
      <div className="clocks-container">
        
        {/* Digital Clock */}
        <div className="digital-clock">
          <h2>Digital</h2>
          <div className="time">{hours}:{minutes}:{seconds}</div>
          <div className="date">{time.toLocaleDateString()}</div>
        </div>

        {/* Analog Clock */}
        <div className="analog-clock">
          <h2>Analog</h2>
          <div className="clock-face">
            {numbers.map((num) => {
              const angle = (num * 30) - 90; // -90 to start at 12 o'clock
              const x = 50 + 40 * Math.cos(angle * Math.PI / 180);
              const y = 50 + 40 * Math.sin(angle * Math.PI / 180);
              return (
                <div 
                  key={num} 
                  className="number"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {num}
                </div>
              );
            })}
            
            <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
            <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
            <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
            <div className="center-dot"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;