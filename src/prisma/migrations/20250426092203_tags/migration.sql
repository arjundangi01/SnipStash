-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnippetTag" (
    "snippetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SnippetTag_pkey" PRIMARY KEY ("snippetId","tagId")
);

-- CreateTable
CREATE TABLE "_SnippetToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_publicId_key" ON "Snippet"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_publicId_key" ON "Tag"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "_SnippetToTag_AB_unique" ON "_SnippetToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SnippetToTag_B_index" ON "_SnippetToTag"("B");

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
