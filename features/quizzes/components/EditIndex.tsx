import Link from 'next/link';
import { useState, useEffect, FC } from 'react';
import supabase from 'utils/supabase';
import { useSetAtom } from 'jotai';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { DeleteConfirmButton } from 'features/quizzes/components/DeleteConfirmButton';

type Quiz = {
  id: number;
  commentary: string;
  created_at: string;
};
const MESSAGE: { [key: string]: { [key: string]: string } } = {
  DELETE: {
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

  const onDeleteLabelClicked = (id: number): void => {
    console.log('削除');
    deleteQuizBy(id);
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
                  <DeleteConfirmButton
                    onDeleteClicked={() => onDeleteLabelClicked(quiz.id)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
