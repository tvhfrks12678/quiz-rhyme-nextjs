import { useState, useEffect, FC } from 'react';
import supabase from '../../utils/supabase';

type Quiz = {
  id: number;
  commentary: string;
  created_at: string;
};

const Index: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async (): Promise<void> => {
    const { data } = await supabase
      .from('quizzes')
      .select('id, commentary, created_at');
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <>
      <div>Index</div>
      {quizzes.map<JSX.Element>((quiz: Quiz) => (
        <p key={quiz.id}>{quiz.commentary}</p>
      ))}
    </>
  );
};

export default Index;
