import { FC } from 'react';
import { InputForm } from 'features/quizzes/components/InputForm';
import { Nav } from 'features/quizzes/components/Nav';

const New: FC = () => {
  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ新規登録</h1>
      <InputForm inputFormRole="RESISTER" />
    </>
  );
};

export default New;
