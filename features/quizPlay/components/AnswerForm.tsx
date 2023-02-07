import { FC } from 'react'
import { useAnswerForm } from '../hooks/useAnserForm'
import { ChoiceForPlay } from '../types/quizToPlay'
import { AnswerButton } from './parts/AnswerButton'

export const AnswerForm: FC<{ choices: ChoiceForPlay[] }> = ({ choices }) => {
  const { CheckboxForAnswer, onSubmitClicked } = useAnswerForm()
  return (
    <form onSubmit={onSubmitClicked}>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {choices.map((choice: ChoiceForPlay) => {
          return (
            <div
              key={choice.id}
              className="border-2 border-sky-500 rounded-3xl p-3">
              <label className="flex items-center md:text-2xl text-1xl cursor-pointer">
                <CheckboxForAnswer
                  value={choice.id}
                  className="checkbox checkbox-info mr-2"
                />
                {choice.content}
              </label>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center mb-2">
        <AnswerButton />
      </div>
    </form>
  )
}
