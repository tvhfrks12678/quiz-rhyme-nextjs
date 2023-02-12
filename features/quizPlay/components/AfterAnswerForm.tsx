import { useAtomValue } from 'jotai'
import { keyRhymeValueColor, quizToPlay, selectedChoiceId } from '../store'
import { ChoiceForPlay } from '../types/quizToPlay'
import { RetryButton } from './RetryButton'
import { HiOutlineLightBulb } from 'react-icons/hi2'

export const AfterAnswerForm = () => {
  const quiz = useAtomValue(quizToPlay)
  const quizSelectedChoiceIds = useAtomValue(selectedChoiceId)
  const DisplayKeyRhymeValueColor = useAtomValue(keyRhymeValueColor)
  const color = 'sky'
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-wrap gap-5 mb-6">
        {quiz?.choices.map((choice: ChoiceForPlay) => {
          return (
            <div key={choice.id} className="">
              <div className="md:text-3xl text-2xl">
                {choice.rhyme ? (
                  <>
                    <div className="flex items-center">
                      {quizSelectedChoiceIds.includes(choice.id) ? (
                        <input
                          type="checkbox"
                          className="checkbox mr-1"
                          disabled
                          checked
                        />
                      ) : (
                        <></>
                      )}
                      <div
                        className={`underline decoration-${DisplayKeyRhymeValueColor.get(
                          choice.rhyme?.content
                        )}-500`}>
                        {choice.content}
                      </div>
                    </div>

                    <div
                      className={`flex justify-end text-${DisplayKeyRhymeValueColor.get(
                        choice.rhyme?.content
                      )}-500 leading-6`}>
                      {choice.rhyme?.content}
                    </div>
                  </>
                ) : (
                  <div>
                    {quizSelectedChoiceIds.includes(choice.id) ? (
                      <input
                        type="checkbox"
                        className="checkbox mr-1"
                        disabled
                        checked
                      />
                    ) : (
                      <></>
                    )}
                    {choice.content}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="divider"></div>
      <div className="flex items-center md:text-4xl text-3xl mb-2">
        <div className="mr-1">
          <HiOutlineLightBulb />
        </div>
        補足
      </div>
      <div className="md:text-3xl text-2xl mb-5">{quiz?.commentary}</div>
      <div className="divider"></div>
      <div className="mb-1 mt-6">
        <RetryButton />
      </div>
    </>
  )
}
