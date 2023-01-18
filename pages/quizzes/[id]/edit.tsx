import { InputForm } from 'features/quizzes/components/InputForm';
import { Nav } from 'features/quizzes/components/Nav';
import { Spiner } from 'features/quizzes/components/parts/Spiner';
import { useGetQuizForEdit } from 'features/quizzes/hooks/useGetQuizForEdit';
import { FC } from 'react';

const Edit: FC = () => {
  const quizCommentary = useGetQuizForEdit();

  return (
    <>
      <Nav />
      <h1 className="text-5xl font-bold mt-4 mb-4">クイズ編集</h1>
      {quizCommentary ? (
        <InputForm inputFormRole="UPDATE" quizCommentary={quizCommentary} />
      ) : (
        <Spiner />
      )}
    </>
  );
};

export default Edit;
