import { FC, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { messageForQuizCrudAtom } from '../../features/quizzes/store';
import { EditIndex } from 'features/quizzes/components/EditIndex';
import { Nav } from 'features/quizzes/components/Nav';
import Router from 'next/router';
import supabase from 'utils/supabase';
import { Spiner } from 'features/quizzes/components/parts/Spiner';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [message] = useAtom(messageForQuizCrudAtom);

  useEffect(() => {
    checkLogin();
    setIsLoading(false);
  }, []);

  async function checkLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      Router.push({
        pathname: '/login',
      });
    }
  }

  if (isLoading) return <Spiner />;

  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ投稿一覧</h1>
      {message ? (
        <div className="alert alert-success shadow-lg mb-4 mt-4">{message}</div>
      ) : (
        <div className="pt-14 pb-4"></div>
      )}
      <EditIndex />
    </>
  );
};

export default Index;
