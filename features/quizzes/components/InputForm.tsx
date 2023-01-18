import { PostgrestError } from '@supabase/supabase-js';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router from 'next/router';
import { useState } from 'react';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const INPUT_FORM_KEY_ROLE_VALUE_SETTING: {
  [key: string]: { BUTTON_NAME: string; SUCCESS_MESSAGE: string };
} = {
  RESISTER: {
    BUTTON_NAME: '登録',
    SUCCESS_MESSAGE: 'クイズを新規登録しました。',
  },
  UPDATE: { BUTTON_NAME: '更新', SUCCESS_MESSAGE: 'クイズを編集しました。' },
};
type InputFormRole = keyof typeof INPUT_FORM_KEY_ROLE_VALUE_SETTING;

type Props = {
  inputFormRole: InputFormRole;
  quizCommentary?: string;
  submitQuiz: (commentary: string) => Promise<PostgrestError | null>;
};

type Inputs = {
  commentary: string;
};

export const InputForm: FC<Props> = ({
  inputFormRole,
  quizCommentary = '',
  submitQuiz,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setMessage = useSetAtom(messageForQuizCrudAtom);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { commentary: quizCommentary },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onQuizInputClicked(data.commentary);
  };

  async function onQuizInputClicked(commentary: string): Promise<void> {
    setLoading(true);

    try {
      const error = await submitQuiz(commentary);

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
            : INPUT_FORM_KEY_ROLE_VALUE_SETTING[inputFormRole].BUTTON_NAME}
        </button>
      </form>
    </>
  );
};
