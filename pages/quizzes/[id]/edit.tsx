import { InputForm } from 'features/quizzes/components/InputForm';
import { Nav } from 'features/quizzes/components/parts/Nav';
import { FC } from 'react';

const Edit: FC = () => {
  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ編集</h1>
      <InputForm inputFormRole="update" />
    </>
  );
};

export default Edit;
