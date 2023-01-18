import { useUser } from '@supabase/auth-helpers-react';
import { PostgrestError } from '@supabase/supabase-js';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { FC } from 'react';
import supabase from 'utils/supabase';
import { useForm, SubmitHandler } from 'react-hook-form';

const INPUT_FORM_KEY_ROLE_VALUE_SETTING: {
  [key: string]: { buttonName: string; SUCCESS_MESSAGE: string };
} = {
  RESISTER: {
    buttonName: '登録',
    SUCCESS_MESSAGE: 'クイズを新規登録しました。',
  },
  UPDATE: { buttonName: '更新', SUCCESS_MESSAGE: 'クイズを編集しました。' },
};
type InputFormRole = keyof typeof INPUT_FORM_KEY_ROLE_VALUE_SETTING;

type Props = {
  inputFormRole: InputFormRole;
  quizCommentary?: string;
};

type Inputs = {
  commentary: string;
};

export const InputForm: FC<Props> = ({
  inputFormRole,
  quizCommentary = '',
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const user = useUser();

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: { commentary: quizCommentary },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onQuizInputClicked(data.commentary);
  };

  async function resisterQuiz(
    commentary: string,
    user_id: string
  ): Promise<PostgrestError | null> {
    let { error } = await supabase
      .from('quizzes')
      .insert({ commentary, user_id });
    return error;
  }

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

  async function onQuizInputClicked(commentary: string): Promise<void> {
    setLoading(true);
    let error: PostgrestError | null = null;
    try {
      if (!user) throw new Error('No user');
      if (inputFormRole === 'RESISTER') {
        error = await resisterQuiz(commentary, user.id);
      }
      if (inputFormRole === 'UPDATE') {
        error = await updateQuiz(commentary);
      }
      if (error) throw error;
      setMessage(
        INPUT_FORM_KEY_ROLE_VALUE_SETTING[inputFormRole].SUCCESS_MESSAGE
      );
      Router.push({
        pathname: '/quizzes',
      });
    } catch (error) {
      alert(`${inputFormRole} failed`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span>Quiz Commentary</span>
          </label>
          <label
            htmlFor="commentary"
            className="input-group input-group-vertical">
            <span>Commentary</span>
            <textarea
              id="commentary"
              {...register('commentary')}
              className="textarea textarea-bordered"
              placeholder="クイズの解説を入力して下さい"></textarea>
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? 'Loading ...'
            : INPUT_FORM_KEY_ROLE_VALUE_SETTING[inputFormRole].buttonName}
        </button>
      </form>
    </>
  );
};
