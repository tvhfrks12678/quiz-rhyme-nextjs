import { useEffect, useState } from 'react';
import supabase from 'utils/supabase';
import { Quiz } from 'features/quizzes/types/quiz';

export const useGetQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async (): Promise<void> => {
    const { data, error } = await supabase
      .from('Quiz')
      .select('id, commentary, created_at')
      .order('id', { ascending: false });
    if (error) console.error(error);
    if (data) {
      setQuizzes(data);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return { quizzes, fetchQuizzes };
};
