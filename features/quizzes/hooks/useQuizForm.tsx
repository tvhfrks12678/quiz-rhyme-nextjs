import { PostgrestError } from '@supabase/supabase-js';
import { messageForQuizCrudAtom } from 'features/quizzes/store';
import { useSetAtom } from 'jotai';
import Router from 'next/router';
import { ComponentPropsWithoutRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputFormRole } from 'features/quizzes/types/quiz';

type Inputs = {
  commentary: string;
};

export const useQuizForm = (
  inputFormRole: InputFormRole,
  quizCommentary: string = '',
  submitQuiz: (commentary: string) => Promise<PostgrestError | null>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setMessage = useSetAtom(messageForQuizCrudAtom);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { commentary: quizCommentary },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onQuizInputClicked(data.commentary);
  };

  const onSubmitClicked = handleSubmit(onSubmit);

  const CommentaryTextarea = (props: ComponentPropsWithoutRef<'textarea'>) => (
    <textarea {...props} {...register('commentary')} />
  );

  async function onQuizInputClicked(commentary: string): Promise<void> {
    setIsLoading(true);

    try {
      const error = await submitQuiz(commentary);

      if (error) throw error;
      setMessage(`クイズを${inputFormRole}しました。`);
      Router.push({
        pathname: '/quizzes',
      });
    } catch (error) {
      alert(`クイズの${inputFormRole}に失敗しました。`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { CommentaryTextarea, onSubmitClicked, isLoading };
};
