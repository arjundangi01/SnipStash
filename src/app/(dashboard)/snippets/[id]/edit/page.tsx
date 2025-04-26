"use client";

import { SnippetForm } from "@/src/app/(dashboard)/snippets/_components/snippet-form";
import { useSnippet } from "@/src/hooks/useSnippet";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditSnippetPage({ params }: PageProps) {
  const { id } = params;

  const { data } = useSnippet(id);
  const snippet = data?.snippet;

  if (!snippet) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Snippet
        </h1>
        <p className="text-muted-foreground mt-2">
          Add a new code snippet to your collection
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SnippetForm mode="update" snippet={snippet} />
      </div>
    </div>
  );
}
