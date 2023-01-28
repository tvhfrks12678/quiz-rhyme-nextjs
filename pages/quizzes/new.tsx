import { Nav } from 'features/quizzes/components/Nav';
import { Headline } from 'features/quizzes/components/parts/Headline';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import supabase from 'utils/supabase';

type Inputs = {
  commentary: string;
};

const MESSAGE_RESISTER_SUCCESS = 'クイズを登録しました。';
const HEADLINE_WORD = 'クイズ新規登録';

const New = () => {
  const setMessage = useSetAtom(messageForQuizCrudAtom);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Router.push({ pathname: '/login' });
      return;
    }

    try {
      const response = await fetch('/api/quizzes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          commentary: data.commentary,
        }),
      });
      console.info(response);
      const createdData = await response.json();
      console.info(createdData);
      if (response.ok) {
        setMessage(MESSAGE_RESISTER_SUCCESS);
        Router.push({ pathname: '/quizzes' });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Nav />
      <Headline headlineWord={HEADLINE_WORD} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('commentary')} />
        <button type="submit">登録</button>
      </form>
    </>
  );
};

export default New;
