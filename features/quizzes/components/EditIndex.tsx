import Link from 'next/link';
import { useState, useEffect, FC, Fragment } from 'react';
import supabase from 'utils/supabase';
import { useSetAtom } from 'jotai';
import { messageForQuizCrudAtom } from 'features/quizzes/store';

type Quiz = {
  id: number;
  commentary: string;
  created_at: string;
};
const MESSAGE: { [key: string]: { [key: string]: string } } = {
  DELETE: { CONFIRM: '本当に削除しますか？', SUCCESS: '削除しました。' },
};

export const EditIndex: FC = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom);
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

  const deleteQuizBy = async (id: number): Promise<void> => {
    if (!window.confirm(MESSAGE.DELETE.CONFIRM)) return;
    try {
      const { error } = await supabase.from('quizzesss').delete().eq('id', id);
      fetchQuizzes();
      setMessage(MESSAGE.DELETE.SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {quizzes.map<JSX.Element>((quiz: Quiz) => (
        <Fragment key={quiz.id}>
          <Link
            className="text-blue-600 hover:text-blue-700 mr-2 hover:underline"
            href={`quizzes/${quiz.id}/edit`}>
            編集
          </Link>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => deleteQuizBy(quiz.id)}>
            削除
          </button>
          {quiz.commentary}
          <br></br>
        </Fragment>
      ))}
    </>
  );
};
