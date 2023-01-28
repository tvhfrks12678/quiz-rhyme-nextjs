import { Quiz } from '@prisma/client'
import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Quiz>> => {
  const { userId, commentary, youtubeEmbed } = req.body

  try {
    const result = await prisma.quiz.create({
      data: {
        userId: userId,
        commentary: commentary,
        youtubeEmbed: youtubeEmbed,
      },
    })
    console.info(result)
    return res.status(201).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).end(error)
  }
}

export default handle
