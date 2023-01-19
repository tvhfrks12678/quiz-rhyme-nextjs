import { PostgrestError } from '@supabase/supabase-js';
import { InputForm } from 'features/quizzes/components/InputForm';
import { Nav } from 'features/quizzes/components/Nav';
import { Spiner } from 'features/quizzes/components/parts/Spiner';
import { useGetQuizForEdit } from 'features/quizzes/hooks/useGetQuizForEdit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import supabase from 'utils/supabase';

const Edit: FC = () => {
  const quizCommentary = useGetQuizForEdit();
  const router = useRouter();

  async function updateQuiz(
    commentary: string
  ): Promise<PostgrestError | null> {
    const id: number = Number(router.query.id as string);

    const updates = { commentary, updated_at: new Date().toISOString() };

    const { error } = await supabase
      .from('quizzes')
      .update(updates)
      .eq('id', id)
      .single();
    return error;
  }

  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ編集</h1>
      {quizCommentary ? (
        <InputForm
          inputFormRole="更新"
          quizCommentary={quizCommentary}
          submitQuiz={updateQuiz}
        />
      ) : (
        <Spiner />
      )}
    </>
  );
};

export default Edit;
