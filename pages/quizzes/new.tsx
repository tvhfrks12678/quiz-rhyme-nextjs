import { Nav } from 'features/quizzes/components/Nav'
import { Headline } from 'features/quizzes/components/parts/Headline'
import { messageForQuizCrudAtom } from 'features/quizzes/store'
import { useSetAtom } from 'jotai'
import Router from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import supabase from 'utils/supabase'
import toast, { Toaster } from 'react-hot-toast'

type Inputs = {
  commentary: string
  youtubeEmbed: string
}

const MESSAGE_RESISTER_SUCCESS = 'クイズを登録しました。'
const HEADLINE_WORD = 'クイズ新規登録'

const New = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom)
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
        }),
      })
      console.info(response)
      const createdData = await response.json()
      console.info(createdData)
      if (response.ok) {
        setMessage(MESSAGE_RESISTER_SUCCESS)
        Router.push({ pathname: '/quizzes' })
        return
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
        <button type="submit">登録</button>
      </form>
      <Toaster />
    </>
  )
}

export default New
