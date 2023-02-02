import { Prisma, Quiz } from '@prisma/client'
import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

type Choice = {
  content: string
  rhyme: string
}

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Quiz>> => {
  const { userId, commentary, youtubeEmbed, choices } = req.body
  try {
    await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const rhymeWords: string[] = choices
          .map((choice: Choice) => {
            if (choice.rhyme) return choice.rhyme
          })
          .filter(Boolean)

        let rhymesKeyContentValueId: { [key: string]: string } = {}

        for (const rhymeWord of rhymeWords) {
          const rhyme = await tx.rhyme.findUnique({
            where: {
              content: rhymeWord,
            },
          })
          if (rhyme) {
            rhymesKeyContentValueId[rhyme.content] = rhyme.id
            continue
          }
          const createdRhyme = await tx.rhyme.create({
            data: {
              content: rhymeWord,
            },
          })
          rhymesKeyContentValueId[createdRhyme.content] = createdRhyme.id
        }

        const quiz = await tx.quiz.create({
          data: {
            userId: userId,
            commentary: commentary,
            youtubeEmbed: youtubeEmbed,
          },
        })
        console.info(quiz)

        for (const choice of choices) {
          if (choice.rhyme) {
            await tx.choice.create({
              data: {
                quizId: quiz.id,
                content: choice.content,
                rhymeId: rhymesKeyContentValueId[choice.rhyme],
              },
            })
            continue
          }
          await tx.choice.create({
            data: {
              quizId: quiz.id,
              content: choice.content,
            },
          })
        }
        return res.status(201).json(quiz)
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    )
  } catch (error) {
    console.error(error)
    return res.status(500).end(error)
  }
}

export default handle
