-- CreateTable
CREATE TABLE "Choice" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "rhymeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Choice_rhymeId_key" ON "Choice"("rhymeId");

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_rhymeId_fkey" FOREIGN KEY ("rhymeId") REFERENCES "Rhyme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
