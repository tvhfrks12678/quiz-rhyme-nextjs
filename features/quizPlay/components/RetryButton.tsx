import { useSetAtom } from 'jotai'
import { ImSpinner11 } from 'react-icons/im'
import { isAnswered, isCorrect } from '../store'

export const RetryButton = () => {
  const setIsAnswered = useSetAtom(isAnswered)
  const setIsCorrected = useSetAtom(isCorrect)
  const onRetryClicked = () => {
    setIsAnswered(false)
    setIsCorrected(false)
  }
  return (
    <div className="flex justify-center">
      <button
        onClick={onRetryClicked}
        className="btn btn-wide btn-outline btn-secondary text-2xl rounded-2xl">
        <div className="mr-4">
          <ImSpinner11 />
        </div>
        リトライ
      </button>
    </div>
  )
}
