import { FC } from 'react';
import { InputForm } from 'features/quizzes/components/InputForm';
import { Nav } from 'features/quizzes/components/Nav';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from 'utils/supabase';
import { useUser } from '@supabase/auth-helpers-react';

const New: FC = () => {
  const user = useUser();
  async function resisterQuiz(
    commentary: string
  ): Promise<PostgrestError | null> {
    if (!user) throw new Error('No user');
    const user_id: string = user.id;
    const { error } = await supabase
      .from('quizzes')
      .insert({ commentary, user_id });
    return error;
  }

  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ新規登録</h1>
      <InputForm inputFormRole="RESISTER" submitQuiz={resisterQuiz} />
    </>
  );
};

export default New;
