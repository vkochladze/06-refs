import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge/TimerChallenge';
import { useState, useRef } from 'react';

function App() {

  const [playerName, setPlayerName] = useState('unknown entity');
  const playerNameFromInput = useRef<HTMLInputElement>(null);


  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (playerNameFromInput.current) {
      setPlayerName(playerNameFromInput.current.value);
    }
    e.currentTarget.reset();
  }

  return (
    <>
      <Player handleClick={handleClick} playerName={playerName} ref={playerNameFromInput} />
      <div id="challenges">
        <TimerChallenge difficulty='Easy' time={1} playerName={playerName} />
        <TimerChallenge difficulty='Not Easy' time={5} playerName={playerName} />
        <TimerChallenge difficulty='Getting Tough' time={10} playerName={playerName} />
        <TimerChallenge difficulty='Pros Only' time={15} playerName={playerName} />

      </div>
    </>
  );
}

export default App;
