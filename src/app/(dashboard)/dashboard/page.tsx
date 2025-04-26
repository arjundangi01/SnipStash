"use client";
import { useSnippets } from "@/src/hooks/useSnippet";
import { SnippetGrid } from "../snippets/_components/snippet-grid";
import { useSnippetParams } from "../snippets/_hooks/useSnippetParams";
import { Search, X } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";

export default function DashboardPage() {
  const { getParams, setParams, clearParams } = useSnippetParams();
  const [search, setSearch] = useState("");
  const { languages, tagIds } = getParams();

  const { data: snippets, isFetching } = useSnippets({
    languages: languages || [],
    tagIds: tagIds || [],
    search: search || "",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Snippets</h1>
        <p className="text-muted-foreground mt-2">
          Manage and organize your code snippets
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search snippets..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
            onClick={() => setSearch("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <SnippetGrid
        snippets={snippets?.snippets}
        // initialLanguages={languages}
        // initialTags={formattedTags}
        search={search}
        isLoading={isFetching}
      />
    </div>
  );
}
