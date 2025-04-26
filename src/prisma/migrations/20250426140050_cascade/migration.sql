-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetTag" DROP CONSTRAINT "SnippetTag_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetTag" DROP CONSTRAINT "SnippetTag_tagId_fkey";

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;
