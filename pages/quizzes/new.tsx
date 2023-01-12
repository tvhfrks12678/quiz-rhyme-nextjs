import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { ChangeEvent, FC, useState } from 'react';
import supabase from '../../utils/supabase';
import { useAtom } from 'jotai';
import { messageForQuizCrudAtom } from '../../features/quizzes/store';

const QUIZ_REGISTRATION_SUCCESS_MESSAGE: string = 'クイズを新規登録しました。';

const New: FC = () => {
  const [message, setMessage] = useAtom(messageForQuizCrudAtom);
  const user = useUser();
  const [commentary, setCommentary] = useState<string>('');

  const onQuizCommentaryChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentary(e.target.value);
  };

  const resisterQuiz = async () => {
    const user_id = user.id;
    let { error } = await supabase
      .from('quizzes')
      .insert({ commentary, user_id });
    console.log(error);
    setMessage(QUIZ_REGISTRATION_SUCCESS_MESSAGE);
    Router.push({
      pathname: '/quizzes',
    });
  };

  return (
    <>
      <p>New</p>
      <label htmlFor="commentary">Commentary</label>
      <input
        id="commentary"
        type="text"
        value={commentary}
        onChange={onQuizCommentaryChanged}
      />
      <button onClick={resisterQuiz}>登録</button>
    </>
  );
};

export default New;
