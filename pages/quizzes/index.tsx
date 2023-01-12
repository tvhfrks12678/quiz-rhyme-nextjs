import Link from 'next/link';
import { useState, useEffect, FC, Fragment } from 'react';
import supabase from '../../utils/supabase';
import { atom, useAtom } from 'jotai';
import { messageForQuizCrudAtom } from '../../features/quizzes/store';

type Quiz = {
  id: number;
  commentary: string;
  created_at: string;
};

const Index: FC = () => {
  const [message] = useAtom<string>(messageForQuizCrudAtom);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const fetchQuizzes = async (): Promise<void> => {
    const { data } = await supabase
      .from('quizzes')
      .select('id, commentary, created_at');
    if (data) {
      setQuizzes(data);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <>
      <div className="text-3xl font-bold underline">Index</div>
      <Link href="/quizzes/new">クイズ新規登録</Link>
      <p className="text-rose-600">{message}</p>
      {quizzes.map<JSX.Element>((quiz: Quiz) => (
        <Fragment key={quiz.id}>
          {quiz.commentary}
          <Link href={`quizzes/${quiz.id}/edit`}>編集</Link>
          <br></br>
        </Fragment>
      ))}
    </>
  );
};

export default Index;
