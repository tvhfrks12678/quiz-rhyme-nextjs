import { Spiner } from 'features/quizzes/components/parts/Spiner'
import { useEffect, useState } from 'react'
import supabase from 'utils/supabase'
import { QuizToPlay } from 'features/quizPlay/types/quizToPlay'
import ProcessError from 'components/ProcessError'
import { Header } from 'components/Header'
import { YoutubeEmbed } from 'features/quizPlay/components/parts/YoutubeEmbed'
import { Question } from 'features/quizPlay/components/parts/Question'
import { AnswerForm } from 'features/quizPlay/components/AnswerForm'

const Home = () => {
  const [quizzes, setQuizzes] = useState<QuizToPlay[]>([])
  const [quiz, setQuiz] = useState<QuizToPlay>()
  const [isLogin, setIsLogin] = useState(false)
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

  if (!quiz) return <Spiner />

  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="basis-1/6"></div>
        <div className="basis-4/6 border p-8 rounded-2xl">
          <div className="mb-6">
            <Question />
          </div>
          <div className="flex justify-center mb-8">
            {quiz.youtubeEmbed ? (
              <YoutubeEmbed src={quiz.youtubeEmbed} />
            ) : (
              <></>
            )}
          </div>
          <AnswerForm choices={quiz.choices} />
        </div>
        <div className="basis-1/6"></div>
      </div>
    </>
  )
}

export default Home
