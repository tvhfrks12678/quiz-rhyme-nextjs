import Link from 'next/link';
import { FC } from 'react';

export const Nav: FC = () => {
  return (
    <div className="navbar bg-base-100">
      <Link className="btn btn-ghost normal-case text-xl" href="/quizzes/">
        クイズ投稿一覧
      </Link>
      <Link className="btn btn-ghost normal-case text-xl" href="/quizzes/new">
        クイズ新規登録
      </Link>
    </div>
  );
};
