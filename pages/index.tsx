import { Spiner } from 'features/quizzes/components/parts/Spiner'
import { useEffect, useState } from 'react'
import supabase from 'utils/supabase'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { ChoiceForPlay, QuizToPlay } from 'features/quizPlay/types/quizToPlay'
import ProcessError from 'components/ProcessError'

const Home = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())
  const [quizzes, setQuizzes] = useState<QuizToPlay[]>([])
  const [quiz, setQuiz] = useState<QuizToPlay>()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const getIsLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setIsLogin(true)
      }
    }

    const getQuiz = async () => {
      try {
        const response = await fetch('/api/quizzes/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.info(response)
        const responseJson = await response.json()
        console.log(responseJson)
        if (response.ok) {
          setQuizzes(responseJson)
          setQuiz(responseJson[0])
          setIsLoading(false)
          return
        }
        setIsError(true)
      } catch (error) {
        console.error(error)
      }
    }

    getIsLogin()
    getQuiz()
  }, [])

  if (isError) return <ProcessError />

  if (isLoading) return <Spiner />

  return (
    <>
      <div className="flex mt-4 mb-10 pb-4 border-b-2 border-y-gray-300 md:text-6xl text-3xl">
        <h1 className="tracking-widest mr-4 ml-4">
          <FaMicrophoneAlt />
        </h1>
        <h1 className="tracking-widest ">Quiz Rhyme</h1>
      </div>

      <div className="flex flex-row">
        <div className="basis-1/6"></div>
        <div className="basis-4/6 border p-6 rounded-2xl">
          <div className="flex mb-6">
            <div className="md:text-5xl text-3xl mr-2">Q.</div>
            <h2 className="md:text-4xl text-2xl flex items-center">
              韻を踏んでる組み合わせは？
            </h2>
          </div>
          <div className="flex justify-center mb-4">
            <iframe
              className="mb-4 w-5/6 aspect-video rounded-2xl"
              src={`${quiz?.youtubeEmbed}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
          <div className="mb-4">
            {quiz?.choices.map((choice: ChoiceForPlay) => {
              return (
                <div
                  className="form-control inline-block border-2 border-sky-500 rounded-3xl mr-4 mb-4"
                  key={choice.id}>
                  <label className="cursor-pointer label ml-2">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="checkbox checkbox-info"
                    />
                    <span className="label-text ml-2 mr-2 md:text-2xl text-1xl">
                      {choice.content}
                    </span>
                  </label>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center">
            <button className="btn btn-wide btn-primary text-2xl rounded-2xl ">
              回答
            </button>
          </div>
        </div>
        <div className="basis-1/6"></div>
      </div>
    </>
  )
}

export default Home
