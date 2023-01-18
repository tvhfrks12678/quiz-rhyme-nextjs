import Link from 'next/link';
import { FC } from 'react';
import supabase from 'utils/supabase';
import { useSetAtom } from 'jotai';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { DeleteConfirmButton } from 'features/quizzes/components/parts/DeleteConfirmButton';
import { useGetQuizzes } from 'features/quizzes/hooks/useGetQuizzes';
import { Quiz } from 'features/quizzes/types/quiz';

const MESSAGE: { [key: string]: { [key: string]: string } } = {
  DELETE: {
    SUCCESS: '削除しました。',
    FAILURE: '削除に失敗しました。',
  },
};

export const EditIndex: FC = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const { quizzes, fetchQuizzes } = useGetQuizzes();

  const deleteQuizBy = async (id: number): Promise<void> => {
    console.log('削除');
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
                  <DeleteConfirmButton
                    onDeleteClicked={() => deleteQuizBy(quiz.id)}
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
