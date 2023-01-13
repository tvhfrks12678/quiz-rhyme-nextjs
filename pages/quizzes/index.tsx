import Link from 'next/link';
import { FC } from 'react';
import { useAtom } from 'jotai';
import { messageForQuizCrudAtom } from '../../features/quizzes/store';
import { EditIndex } from 'features/quizzes/components/EditIndex';

const Index: FC = () => {
  const [message] = useAtom(messageForQuizCrudAtom);

  return (
    <>
      <div className="text-3xl font-bold underline">Index</div>
      <Link href="/quizzes/new">クイズ新規登録</Link>
      <p className="text-rose-600">{message}</p>
      <EditIndex />
    </>
  );
};

export default Index;
