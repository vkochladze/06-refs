import ResultModal from '../ResultModal/ResultModal';
import './TimerChallenge.css'
import { useState, useRef } from 'react'

interface TimerChallengeInfo {
    difficulty: string,
    time: number;
    playerName: string
}

interface ResultModalHandle {
    open: () => void;
}

export default function TimerChallenge({ difficulty, time, playerName }: TimerChallengeInfo) {

    const [timeRemaining, setTimeRemaining] = useState(time * 1000);

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dialog = useRef<ResultModalHandle | null>(null);

    let timerActive = timeRemaining > 0 && timeRemaining < time * 1000

    const second = time > 1 ? 'seconds' : 'second';

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10);
    }

    if (timeRemaining <= 0) {
        timerActive = false;
        timer.current !== null && clearInterval(timer.current);
        dialog.current?.open();
    }

    function handleReset() {
        setTimeRemaining(time * 1000)

    }

    function handleStop() {
        timerActive = false;
        dialog.current?.open();
        timer.current !== null && clearInterval(timer.current);
    }


    return (
        <>
            <ResultModal remainingTime={timeRemaining} ref={dialog} targetTime={time} reset={handleReset} playerName={playerName} />

            <section className='challenge'>
                <h2>{difficulty}</h2>
                <p className='challenge-time'>{time} {second}</p>
                <button onClick={timerActive ? handleStop : handleStart}>{timerActive ? 'Stop' : 'Start'} Challenge</button>
                <p className={timerActive ? 'active' : undefined}>{timerActive ? 'Timer running...' : 'Timer stopped'}</p>
            </section>
        </>
    )
}