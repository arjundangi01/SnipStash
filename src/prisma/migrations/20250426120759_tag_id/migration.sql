/*
  Warnings:

  - The primary key for the `SnippetTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_SnippetToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[publicId]` on the table `SnippetTag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[snippetId,tagId]` on the table `SnippetTag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `SnippetTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_B_fkey";

-- AlterTable
ALTER TABLE "SnippetTag" DROP CONSTRAINT "SnippetTag_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD CONSTRAINT "SnippetTag_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_SnippetToTag";

-- CreateIndex
CREATE UNIQUE INDEX "SnippetTag_publicId_key" ON "SnippetTag"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetTag_snippetId_tagId_key" ON "SnippetTag"("snippetId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
