import './TimerChallenge.css'
import { useState, useRef } from 'react'

interface TimerChallengeInfo {
    difficulty: string,
    time: number;
}

export default function TimerChallenge({ difficulty, time }: TimerChallengeInfo) {

    const [timerRunning, setTimerRunning] = useState<null | boolean>(null);
    const timer = useRef<HTMLParagraphElement>(null);

    let timerTimeout;

    const second = time > 1 ? 'seconds' : 'second';

    function handleClick() {
        // timerRunning === null ? setTimerRunning(true) : (setTimerRunning((prev) => !prev) && clearTimeout(timerTimeout));

        if (timerRunning === null) {
            setTimerRunning(true);
        } else {
            setTimerRunning((prev) => !prev);
            clearTimeout(timerTimeout);
        }

        timerTimeout = setTimeout(() => {
            setTimerRunning((prev) => !prev);
            console.log(timerRunning);

        }, time * 1000);
    }

    return (
        <section className='challenge'>
            <h2>{difficulty}</h2>
            {timerRunning === false && <p>You Lost!</p>}
            <p className='challenge-time' ref={timer}>{time} {second}</p>
            <button onClick={handleClick}>{timerRunning ? 'Stop' : 'Start'} Challenge</button>
            <p className={timerRunning ? 'active' : undefined}>{timerRunning ? 'Timer running...' : 'Timer stopped'}</p>
        </section>
    )
}