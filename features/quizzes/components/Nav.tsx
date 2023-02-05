import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { FC } from 'react'
import { messageForQuizCrudAtom } from 'features/quizzes/store'
import supabase from 'utils/supabase'
import Router from 'next/router'

export const Nav: FC = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom)
  const onQuizIndexLinkCliced = () => {
    setMessage('')
  }

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      Router.push({
        pathname: '/login',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="navbar bg-base-100">
      <Link className="btn btn-ghost normal-case text-xl" href="/">
        Home
      </Link>
      <Link
        className="btn btn-ghost normal-case text-xl"
        href="/quizzes/"
        onClick={onQuizIndexLinkCliced}>
        クイズ投稿一覧
      </Link>
      <Link className="btn btn-ghost normal-case text-xl" href="/quizzes/new">
        クイズ新規登録
      </Link>
      <button className="btn btn-ghost normal-case text-xl" onClick={logOut}>
        Log Out
      </button>
    </div>
  )
}
