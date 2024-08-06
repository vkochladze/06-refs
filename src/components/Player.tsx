import { forwardRef } from "react";

interface PlayerInfo {
  handleClick: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  playerName: string;
}

const Player = forwardRef<HTMLInputElement, PlayerInfo>(function Player({ handleClick, playerName }, playerNameFromInputRef) {



  return (

    <section id="player">
      <h2>Welcome {playerName}</h2>
      <form onSubmit={handleClick}>
        <input type="text" ref={playerNameFromInputRef} />
        <button type="submit">Set Name</button>
      </form>
    </section >
  );
})

export default Player;