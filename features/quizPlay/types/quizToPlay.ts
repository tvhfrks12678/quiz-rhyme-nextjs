import { Choice, Quiz, Rhyme } from '@prisma/client'

export type QuizToPlay = Pick<Quiz, 'commentary' | 'youtubeEmbed'> & {
  choices: ChoiceForPlay[]
}

type ChoiceForPlay = Pick<Choice, 'content'> & {
  rhyme: RhymeForPlay | null
}

type RhymeForPlay = Pick<Rhyme, 'content'>
