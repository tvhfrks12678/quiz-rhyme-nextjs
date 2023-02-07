import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'

type FormValues = {
  selectedChoiceId: string
}

type CheckboxProps = {
  value: string
  className: string
}

export const useAnswerForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    toast('実装中', {
      icon: '🚧',
      style: {
        border: '1px solid #713200',
        padding: '16px',
      },
    })
  }

  const onSubmitClicked = handleSubmit(onSubmit)

  const CheckboxForAnswer = ({ ...props }: CheckboxProps) => (
    <>
      <input type="checkbox" {...props} {...register('selectedChoiceId')} />
      <Toaster />
    </>
  )

  return { CheckboxForAnswer, onSubmitClicked }
}
