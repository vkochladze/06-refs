import ResultModal from '../ResultModal/ResultModal';
import './TimerChallenge.css'
import { useState, useRef } from 'react'

interface TimerChallengeInfo {
    difficulty: string,
    time: number;
}

let stoppedInTime: boolean | null = null;

export default function TimerChallenge({ difficulty, time }: TimerChallengeInfo) {

    // const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dialog = useRef<HTMLDialogElement>();

    const second = time > 1 ? 'seconds' : 'second';

    function handleStart() {
        setTimerStarted(true)
        // setTimerExpired(false);

        timer.current = setTimeout(() => {
            // setTimerExpired(true);
            setTimerStarted(false);
            dialog.current && dialog.current.open();
            stoppedInTime = false;
        }, time * 1000);
    }

    function handleStop() {
        setTimerStarted(false);
        stoppedInTime = true;
        dialog.current && dialog.current.open();
        timer.current !== null && clearTimeout(timer.current);
    }

    // function winningCondition() {
    //     if (stoppedInTime) {
    //         return <ResultModal result={'Won'} score={0} ref={dialog} />
    //     } else if (stoppedInTime === false) {
    //         return <ResultModal result={'Lost'} score={0} ref={dialog} />
    //     } else if (stoppedInTime === null) { return null }
    // }

    return (
        <>
            <ResultModal result={stoppedInTime ? 'Won' : 'Lost'} score={0} ref={dialog} targetTime={time} />

            <section className='challenge'>
                <h2>{difficulty}</h2>
                <p className='challenge-time'>{time} {second}</p>
                <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? 'Stop' : 'Start'} Challenge</button>
                <p className={timerStarted ? 'active' : undefined}>{timerStarted ? 'Timer running...' : 'Timer stopped'}</p>
            </section>
        </>
    )
}