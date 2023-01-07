import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, FC } from 'react';
import supabase from '../../utils/supabase';

type Quiz = {
  id: number;
  commentary: string;
  created_at: string;
};

const Index: FC = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [messageForDisplay] = useState<string | string[]>(
    router.query.messageForDisplay
  );
  const fetchQuizzes = async (): Promise<void> => {
    const { data } = await supabase
      .from('quizzes')
      .select('id, commentary, created_at');
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes();
    router.query.messageForDisplay = '';
  }, []);
  return (
    <>
      <div className="text-3xl font-bold underline">Index</div>
      <Link href="/quizzes/new">クイズ新規登録</Link>
      <p className="text-rose-600">{messageForDisplay}</p>
      {quizzes.map<JSX.Element>((quiz: Quiz) => (
        <p key={quiz.id}>{quiz.commentary}</p>
      ))}
    </>
  );
};

export default Index;
