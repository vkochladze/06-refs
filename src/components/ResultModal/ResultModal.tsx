import './ResultModal.css'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface ResultModalInfo {
    targetTime: number,
    remainingTime: number
    reset: () => void
    playerName: string
}

interface ResultModalHandle {
    open: () => void;
}

let result: string;

const ResultModal = forwardRef<ResultModalHandle, ResultModalInfo>(function ResultModal({ targetTime, remainingTime, reset, playerName }, ref) {
    const second = targetTime > 1 ? 'seconds' : 'second';
    const dialog = useRef<HTMLDialogElement | null>(null);
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)

    if (remainingTime === 0) {
        result = 'lost'
    } else if (remainingTime > 0) {
        result = 'won'
    }

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current?.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className='result-modal'>
            <h2>You {result}, {playerName}</h2>
            <p>The target time was <strong>{targetTime} {second}</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left </p>
            <form method='dialog' onSubmit={reset}>
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;