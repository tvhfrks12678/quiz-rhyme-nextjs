import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { ChangeEvent, FC, useState } from 'react';
import supabase from '../../utils/supabase';

const New: FC = () => {
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
    Router.push({
      pathname: '/quizzes',
      query: { messageForDisplay: 'クイズを新規登録しました。' },
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
