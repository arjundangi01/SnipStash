"use client";
import { useSnippets } from "@/src/hooks/useSnippet";
import { SnippetGrid } from "./snippet-grid";
import { useSnippetParams } from "../_hooks/useSnippetParams";
import { Search, X } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Suspense, useState } from "react";

const SnippetContainer = () => {
  const { getParams, setParams, clearParams } = useSnippetParams();
  const [search, setSearch] = useState("");
  const { languages, tagIds } = getParams();

  const { data: snippets, isFetching } = useSnippets({
    languages: languages || [],
    tagIds: tagIds || [],
    search: search || "",
  });
  return (
    <div>
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
};

export default SnippetContainer;
