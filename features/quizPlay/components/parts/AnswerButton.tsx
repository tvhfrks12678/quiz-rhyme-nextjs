import { FaRegPaperPlane } from 'react-icons/fa'

export const AnswerButton = () => {
  return (
    <button className="btn btn-wide btn-primary text-2xl rounded-2xl ">
      <div className="mr-4">
        <FaRegPaperPlane />
      </div>
      回答
    </button>
  )
}
