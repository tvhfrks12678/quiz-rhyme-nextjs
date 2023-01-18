import { useUser } from '@supabase/auth-helpers-react';
import { PostgrestError } from '@supabase/supabase-js';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import supabase from 'utils/supabase';
import { useForm, SubmitHandler } from 'react-hook-form';

const INPUT_FORM_KEY_ROLE_VALUE_SETTING: {
  [key: string]: { buttonName: string; SUCCESS_MESSAGE: string };
} = {
  resister: {
    buttonName: '登録',
    SUCCESS_MESSAGE: 'クイズを新規登録しました。',
  },
  update: { buttonName: '更新', SUCCESS_MESSAGE: 'クイズを編集しました。' },
};
type InputFormRole = keyof typeof INPUT_FORM_KEY_ROLE_VALUE_SETTING;

type Inputs = {
  commentary: string;
};

export const InputForm: FC<{ inputFormRole: InputFormRole }> = ({
  inputFormRole,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const user = useUser();

  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onQuizInputClicked(data.commentary);
    console.log(data);
    console.log(data.commentary);
  };

  useEffect(() => {
    if (inputFormRole === 'resister') return;

    if (!router.isReady) return;

    getQuizById();
  }, [router.isReady]);

  async function getQuizById() {
    try {
      const id: number = Number(router.query.id as string);
      setLoading(true);
      const { data, error, status } = await supabase
        .from('quizzes')
        .select(`commentary, updated_at`)
        .eq('id', id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setValue('commentary', data.commentary);
      }
    } catch (error) {
      alert('Error loading quiz data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
      if (inputFormRole === 'resister') {
        error = await resisterQuiz(commentary, user.id);
      }
      if (inputFormRole === 'update') {
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
