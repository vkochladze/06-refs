import './ResultModal.css'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface ResultModalInfo {
    result: string
    targetTime: number,
    score: number
}

const ResultModal = forwardRef<HTMLDialogElement, ResultModalInfo>(function ResultModal({ result, targetTime, score }, ref) {

    const second = targetTime > 1 ? 'seconds' : 'second';

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className='result-modal'>
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} {second}</strong></p>
            <p>You stopped the timer with <strong>{score} seconds</strong> left </p>
            <form method='dialog'>
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;