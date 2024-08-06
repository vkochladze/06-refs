import './ResultModal.css'
import { forwardRef } from 'react'

interface ResultModalInfo {
    result: string
    score: number
}

const ResultModal = forwardRef(function ResultModal({ result, score }: ResultModalInfo, ref) {
    return (
        <dialog ref={ref} className='result-modal'>
            <h2>You {result}</h2>
            <p>Score: {score}</p>
            <form method='dialog'>
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;