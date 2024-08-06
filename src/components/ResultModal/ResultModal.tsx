import './ResultModal.css'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ResultModalInfo {
    targetTime: number,
    remainingTime: number
    reset: () => void
    playerName: string
}

interface ResultModalHandle {
    open: () => void;
}

const modalRoot = document.getElementById('modal');

if (!modalRoot) {
    throw new Error('The element with id "modal" does not exist in the document.');
}

const ResultModal = forwardRef<ResultModalHandle, ResultModalInfo>(function ResultModal({ targetTime, remainingTime, reset, playerName }, ref) {
    const second = targetTime > 1 ? 'seconds' : 'second';
    const dialog = useRef<HTMLDialogElement | null>(null);
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
    let userLost;
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    if (remainingTime === 0) {
        userLost = true;
    } else if (remainingTime > 0) {
        userLost = false;
    }

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current?.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className='result-modal' onClose={reset}>

            {/* <h2>You {result}, {playerName}</h2> */}
            {userLost && <h2>You lost {playerName}</h2>}
            {!userLost && (
                <>
                    <h2>You Won {playerName}</h2>
                    <h2>Score: {score}</h2>
                </>
            )}

            <p>The target time was <strong>{targetTime} {second}</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left </p>
            <form method='dialog' onSubmit={reset}>
                <button>Close</button>
            </form>
        </dialog>,
        modalRoot
    )
})

export default ResultModal;