import { useAtomValue } from 'jotai'
import { isCorrect } from '../store'
import { ImRadioUnchecked, ImCross } from 'react-icons/im'

export const AnswerResult = () => {
  const isAnswerCorrect = useAtomValue(isCorrect)
  return (
    <>
      <div className="flex text-rose-500">
        <div className="md:text-6xl text-4xl mr-2">
          {isAnswerCorrect ? <ImRadioUnchecked /> : <ImCross />}
        </div>
        <h2 className="md:text-6xl text-4xl flex items-center ">
          {isAnswerCorrect ? <>正解</> : <>不正解</>}
        </h2>
      </div>
    </>
  )
}
