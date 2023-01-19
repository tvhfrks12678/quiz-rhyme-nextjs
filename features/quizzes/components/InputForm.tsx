import { PostgrestError } from '@supabase/supabase-js';
import { FC } from 'react';
import { useQuizForm } from '../hooks/useQuizForm';
import { InputFormRole } from 'features/quizzes/types/quiz';

type Props = {
  inputFormRole: InputFormRole;
  quizCommentary?: string;
  submitQuiz: (commentary: string) => Promise<PostgrestError | null>;
};

export const InputForm: FC<Props> = ({
  inputFormRole,
  quizCommentary = '',
  submitQuiz,
}) => {
  const { CommentaryTextarea, onSubmitClicked, isLoading } = useQuizForm(
    inputFormRole,
    quizCommentary,
    submitQuiz
  );

  return (
    <>
      <form onSubmit={onSubmitClicked}>
        <div className="form-control">
          <label className="label">
            <span>Quiz Commentary</span>
          </label>
          <label
            htmlFor="commentary"
            className="input-group input-group-vertical">
            <span>Commentary</span>
            <CommentaryTextarea
              id="commentary"
              className="textarea textarea-bordered"
              placeholder="クイズの解説を入力して下さい"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading ...' : inputFormRole}
        </button>
      </form>
    </>
  );
};
