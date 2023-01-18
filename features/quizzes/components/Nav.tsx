import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { FC } from 'react';
import { messageForQuizCrudAtom } from 'features/quizzes/store';

export const Nav: FC = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const onQuizIndexLinkCliced = () => {
    setMessage('');
  };
  return (
    <div className="navbar bg-base-100">
      <Link
        className="btn btn-ghost normal-case text-xl"
        href="/quizzes/"
        onClick={onQuizIndexLinkCliced}>
        クイズ投稿一覧
      </Link>
      <Link className="btn btn-ghost normal-case text-xl" href="/quizzes/new">
        クイズ新規登録
      </Link>
    </div>
  );
};
