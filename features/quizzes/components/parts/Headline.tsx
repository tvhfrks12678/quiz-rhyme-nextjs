import { FC } from 'react';
type Props = {
  headlineWord: string;
};
export const Headline: FC<Props> = ({ headlineWord }) => {
  return <h1 className="text-5xl font-bold mt-4 mb-4">{headlineWord}</h1>;
};
