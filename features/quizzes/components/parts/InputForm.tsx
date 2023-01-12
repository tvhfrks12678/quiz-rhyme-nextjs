import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router, { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import supabase from 'utils/supabase';
const INPUT_FORM_KEY_ROLE_VALUE_SETTING: { [key: string]: any } = {
  resister: { buttonName: '登録' },
  update: { buttonName: '更新' },
};
type InputFormRole = keyof typeof INPUT_FORM_KEY_ROLE_VALUE_SETTING;

const QUIZ_UPDATE_SUCCESS_MESSAGE = 'クイズを編集しました。';

export const InputForm: FC<{ inputFormRole: InputFormRole }> = ({
  inputFormRole,
}) => {
  const [commentary, setCommentary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const setMessage = useSetAtom(messageForQuizCrudAtom);

  const onInputClicked = (): void => {
    if (inputFormRole === 'update') {
      console.log('update');
      updateQuiz();
    }
  };

  const onCommentaryChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentary(e.target.value);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

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
        setCommentary(data.commentary);
      }
    } catch (error) {
      alert('Error loading quiz data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuiz(): Promise<void> {
    try {
      const id: number = Number(router.query.id as string);
      setLoading(true);

      const updates = { commentary, updated_at: new Date().toISOString() };

      console.log(updates);
      console.log(id);
      let { error } = await supabase
        .from('quizzes')
        .update(updates)
        .eq('id', id)
        .single();
      if (error) throw error;
      setMessage(QUIZ_UPDATE_SUCCESS_MESSAGE);
      Router.push({
        pathname: '/quizzes',
      });
      alert('Quiz updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <p>Input</p>
      <label
        htmlFor="commentary"
        className="block text-gray-700 font-bold mb-2">
        Commentary
      </label>
      <input
        id="commentary"
        type="commentary"
        className=""
        value={commentary}
        onChange={onCommentaryChanged}
      />
      <button onClick={onInputClicked} disabled={loading}>
        {loading
          ? 'Loading ...'
          : INPUT_FORM_KEY_ROLE_VALUE_SETTING[inputFormRole].buttonName}
      </button>
    </>
  );
};
