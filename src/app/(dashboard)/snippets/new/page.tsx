import { SnippetForm } from "@/src/app/(dashboard)/snippets/_components/snippet-form";

export default function NewSnippetPage() {
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
        <SnippetForm mode="create" />
      </div>
    </div>
  );
}
