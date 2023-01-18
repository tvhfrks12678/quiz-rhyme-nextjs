import { FC } from 'react';
import { useAtom } from 'jotai';
import { messageForQuizCrudAtom } from '../../features/quizzes/store';
import { EditIndex } from 'features/quizzes/components/EditIndex';
import { Nav } from 'features/quizzes/components/Nav';

const Index: FC = () => {
  const [message] = useAtom(messageForQuizCrudAtom);

  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ投稿一覧</h1>
      {message ? (
        <div className="alert alert-success shadow-lg mb-4 mt-4">{message}</div>
      ) : (
        <div className="pt-14 pb-4"></div>
      )}
      <EditIndex />
    </>
  );
};

export default Index;
