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
  DELETE: {
    CONFIRM: '本当に削除しますか？',
    SUCCESS: '削除しました。',
    FAILURE: '削除に失敗しました。',
  },
};

export const EditIndex: FC = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async (): Promise<void> => {
    const { data } = await supabase
      .from('quizzes')
      .select('id, commentary, created_at')
      .order('id', { ascending: false });
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
      const { error } = await supabase.from('quizzes').delete().eq('id', id);
      if (error) throw error;
      fetchQuizzes();
      setMessage(MESSAGE.DELETE.SUCCESS);
    } catch (error) {
      alert(MESSAGE.DELETE.FAILURE);
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>編集</th>
              <th>解説</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map<JSX.Element>((quiz: Quiz) => (
              <tr key={quiz.id}>
                <th>
                  <Link
                    className="link link-primary"
                    href={`quizzes/${quiz.id}/edit`}>
                    編集
                  </Link>
                </th>
                <th>{quiz.commentary}</th>
                <th>
                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteQuizBy(quiz.id)}>
                    削除
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
