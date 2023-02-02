import { Nav } from 'features/quizzes/components/Nav'
import { Headline } from 'features/quizzes/components/parts/Headline'
import { messageForQuizCrudAtom } from 'features/quizzes/store'
import { useSetAtom } from 'jotai'
import Router from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import supabase from 'utils/supabase'

type FormValues = {
  commentary: string
  youtubeEmbed: string
  choices: {
    content: string
    rhyme: string
  }[]
}

const MESSAGE_RESISTER_SUCCESS = 'クイズを登録しました。'
const HEADLINE_WORD = 'クイズ新規登録'

const Input = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      choices: [{ content: '', rhyme: '' }],
    },
    mode: 'onBlur',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'choices',
    control,
  })
  const onSubmit = async (data: FormValues) => {
    console.log(data)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      Router.push({ pathname: '/login' })
      return
    }

    try {
      const response = await fetch('/api/quizzes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          commentary: data.commentary,
          youtubeEmbed: data.youtubeEmbed,
          choices: data.choices,
        }),
      })
      console.info(response)

      if (response.ok) {
        const createdData = await response.json()
        console.info(createdData)
        setMessage(MESSAGE_RESISTER_SUCCESS)
        Router.push({ pathname: '/quizzes' })
      } else {
        toast.error('クイズの登録に失敗しました')
      }
    } catch (error) {
      toast.error('クイズの登録に失敗しました')
      console.error(error)
    }
  }

  return (
    <>
      <Nav />
      <Headline headlineWord={HEADLINE_WORD} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4">
          <label className="input-group input-group-vertical">
            <span>Commentary</span>
            <textarea
              {...register('commentary')}
              placeholder="例: 韻が2つある"
              className="input input-bordered textarea"></textarea>
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="input-group input-group-vertical">
            <span>YouTube Embed</span>
            <textarea
              {...register('youtubeEmbed')}
              placeholder="例: https://youtube.com/embed/eBLdt5emyqk?clip=UgkxxIYOSXUeagWeNxgGg4LLDATxzgGAf3Zs&amp;clipt=ELD5CRiwxQo"
              className="input input-bordered textarea"></textarea>
          </label>
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section key={field.id} className="flex justify-center mb-4">
                <div className="form-control mr-4">
                  <label className="input-group input-group-vertical">
                    <span>選択肢</span>
                    <input
                      type="text"
                      placeholder="例: 私は"
                      {...register(`choices.${index}.content` as const)}
                      defaultValue={field.content}
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control mr-4">
                  <label className="input-group input-group-vertical">
                    <span>母音</span>
                    <input
                      type="text"
                      placeholder="例: auo"
                      {...register(`choices.${index}.rhyme` as const)}
                      defaultValue={field.rhyme}
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          )
        })}
        <div className="flex justify-center mt-4 mb-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              append({
                content: '',
                rhyme: '',
              })
            }>
            追加
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <button type="submit" className="btn btn-wide btn-primary">
            登録
          </button>
        </div>
      </form>
      <Toaster />
    </>
  )
}

export default Input
