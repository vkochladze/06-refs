import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge/TimerChallenge';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge difficulty='Easy' time={1} />
        <TimerChallenge difficulty='Not Easy' time={5} />
        <TimerChallenge difficulty='Getting Tough' time={10} />
        <TimerChallenge difficulty='Pros Only' time={15} />

      </div>
    </>
  );
}

export default App;
