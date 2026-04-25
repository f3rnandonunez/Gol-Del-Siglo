import { useState } from 'react';
import { Game } from './game/components/Game';
import { MainMenu } from './game/components/MainMenu';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="min-h-screen">
      {gameState === 'menu' ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <Game onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
