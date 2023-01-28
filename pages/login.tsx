import supabase from 'utils/supabase';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Spiner } from 'features/quizzes/components/parts/Spiner';

type Inputs = {
  email: string;
  password: string;
};

const LOGIN_ERROR_MESSAGE: string = 'EmailまたはPasswordが間違っています';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmail(data.email, data.password);
  };

  useEffect(() => {
    checkLogin();
    setIsLoading(false);
  }, []);

  async function checkLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      Router.push({
        pathname: '/quizzes',
      });
    }
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.info(data);

      Router.push({
        pathname: '/quizzes',
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(LOGIN_ERROR_MESSAGE);
    }
  }

  if (isLoading) return <Spiner />;

  return (
    <div className="ml-4">
      <h1 className="text-5xl font-bold mt-4 mb-4">Login</h1>
      {errorMessage ? (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="form-control mb-3 ml-8">
          <label className="input-group">
            <span>Email</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register('email')}
            />
          </label>
        </div>
        <div className="form-control mb-3">
          <label className="input-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered"
              {...register('password')}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary ml-20">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
