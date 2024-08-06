import { useState, useRef } from "react";


export default function Player() {

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

    <section id="player">
      <h2>Welcome {playerName}</h2>
      <form onSubmit={handleClick}>
        <input type="text" ref={playerNameFromInput} />
        <button type="submit">Set Name</button>
      </form>
    </section >
  );
}
