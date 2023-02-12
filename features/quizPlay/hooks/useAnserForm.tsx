import { useAtom, useSetAtom } from 'jotai'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  isAnswered,
  isCorrect,
  keyRhymeValueColor,
  quizToPlay,
  selectedChoiceId,
} from '../store'
import { ChoiceForPlay } from '../types/quizToPlay'

type FormValues = {
  selectedChoiceId: string[]
}

type CheckboxProps = {
  value: string
  className: string
}

const COLORS = ['sky', 'red', 'green', 'yellow', 'purple', 'orange', 'pink']

export const useAnswerForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  const [quiz] = useAtom(quizToPlay)
  const setIsAnswered = useSetAtom(isAnswered)
  const setIsCorrected = useSetAtom(isCorrect)
  const setSelectedChoiceId = useSetAtom(selectedChoiceId)
  const setKeyRhymeValueColor = useSetAtom(keyRhymeValueColor)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.selectedChoiceId)
    console.log(quiz)
    setIsAnswered(true)

    const keyRhymeValueChoiceIds = new Map<string, Array<string>>()
    const quizKeyRhymeValueColors = new Map<string, string>()

    quiz?.choices.forEach((choice: ChoiceForPlay) => {
      if (!choice.rhyme) return
      const rhyme = choice.rhyme.content
      const choiceId = choice.id
      if (keyRhymeValueChoiceIds.has(rhyme)) {
        keyRhymeValueChoiceIds.set(rhyme, [
          ...(keyRhymeValueChoiceIds.get(rhyme) ?? []),
          choiceId,
        ])
        return
      }
      keyRhymeValueChoiceIds.set(rhyme, [choiceId])
      quizKeyRhymeValueColors.set(rhyme, COLORS[quizKeyRhymeValueColors.size])
    })

    setKeyRhymeValueColor(quizKeyRhymeValueColors)

    if (!data.selectedChoiceId) return
    setSelectedChoiceId(data.selectedChoiceId)
    const selectChoiceIdsWord = data.selectedChoiceId.sort().toString()
    for (const [key, value] of keyRhymeValueChoiceIds) {
      if (value.sort().toString() === selectChoiceIdsWord) {
        setIsCorrected(true)
        return
      }
    }
  }

  const onSubmitClicked = handleSubmit(onSubmit)

  const CheckboxForAnswer = ({ ...props }: CheckboxProps) => (
    <>
      <input type="checkbox" {...props} {...register('selectedChoiceId')} />
    </>
  )

  return { CheckboxForAnswer, onSubmitClicked }
}
