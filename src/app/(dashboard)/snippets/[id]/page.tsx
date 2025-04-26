"use client";

import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash, ArrowLeft, Code, Edit } from "lucide-react";
import { useSnippet } from "@/src/hooks/useSnippet";

interface PageProps {
  params: {
    id: string;
  };
}

export default function SnippetDetailsPage({ params }: PageProps) {
  const { id } = params;

  const { data } = useSnippet(id);
  const snippet = data?.snippet;

  if (!snippet) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{snippet.title}</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/snippets/${snippet.publicId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Code className="h-4 w-4" />
          <span className="capitalize">{snippet.language}</span>
        </div>
      </div>

      {snippet.description && (
        <div className="bg-muted/50 p-4 rounded-md">
          <p>{snippet.description}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {snippet.snippetTags?.map((tag) => (
          <Badge
            key={tag.tag?.publicId}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <Hash className="h-3 w-3" />
            {tag.tag?.name}
          </Badge>
        ))}
      </div>

      <div className="border rounded-md overflow-hidden">
        <SyntaxHighlighter
          language={snippet.language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
          showLineNumbers={true}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
