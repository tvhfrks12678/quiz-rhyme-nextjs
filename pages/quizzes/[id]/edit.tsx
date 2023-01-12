import { InputForm } from 'features/quizzes/components/parts/InputForm';
import { FC } from 'react';

const Edit: FC = () => {
  return (
    <>
      <p>Edit</p>
      <InputForm inputFormRole="update" />
    </>
  );
};

export default Edit;
