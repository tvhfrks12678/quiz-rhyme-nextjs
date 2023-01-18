import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import supabase from 'utils/supabase';

export const useGetQuizForEdit = () => {
  const [quizCommentary, setQuizCommentary] = useState<string>('');
  const router = useRouter();

  const getQuizById = useCallback(async () => {
    try {
      const id: number = Number(router.query.id as string);
      const { data, error, status } = await supabase
        .from('quizzes')
        .select(`commentary, updated_at`)
        .eq('id', id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setQuizCommentary(data.commentary);
      }
    } catch (error) {
      alert('Error loading quiz data!');
      console.log(error);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    getQuizById();
  }, [router.isReady]);

  return quizCommentary;
};
