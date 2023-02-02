import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

const CONTROL_CHARACTER_COLOR = {
  BLUE: '\u001b[34m',
  RESET: '\u001b[0m',
}

prisma.$on('query', (e: Prisma.QueryEvent) => {
  console.log(
    `${CONTROL_CHARACTER_COLOR.BLUE}'prisma:query'${CONTROL_CHARACTER_COLOR.RESET}`
  )
  console.info(e)
})

export default prisma
