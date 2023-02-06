import { Choice, Quiz, Rhyme } from '@prisma/client'

export type QuizToPlay = Pick<Quiz, 'id' | 'commentary' | 'youtubeEmbed'> & {
  choices: ChoiceForPlay[]
}

export type ChoiceForPlay = Pick<Choice, 'id' | 'content'> & {
  rhyme: RhymeForPlay | null
}

type RhymeForPlay = Pick<Rhyme, 'content'>
