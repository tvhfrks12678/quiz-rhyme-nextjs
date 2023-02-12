import { atom } from 'jotai'
import { QuizToPlay } from './types/quizToPlay'

export const quizToPlayList = atom<QuizToPlay[] | null>(null)
export const quizToPlay = atom<QuizToPlay | null>(null)
export const isCorrect = atom<boolean>(false)
export const isAnswered = atom<boolean>(false)
export const selectedChoiceId = atom<string[]>([])
export const keyRhymeValueColor = atom<Map<string, string>>(new Map())
