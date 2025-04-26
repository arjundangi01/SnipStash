"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SnippetCard } from "@/src/app/(dashboard)/snippets/_components/snippet-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

import { GetSnippetsQuery } from "@/src/gql/client/graphql";
import { useSnippetParams } from "../_hooks/useSnippetParams";

interface SnippetGridProps {
  snippets?: GetSnippetsQuery["snippets"];
  initialLanguages?: { name: string; count: number }[];
  initialTags?: { publicId: string; name: string; count: number }[];
  isLoading?: boolean;
  initialTag?: string;
  search?: string;
}

export function SnippetGrid({
  snippets = [],
  initialLanguages = [],
  initialTags = [],
  isLoading = false,
  initialTag = "",
  search,
}: SnippetGridProps) {
  const [tag, setTag] = useState(initialTag);

  const { getParams, setParams, clearParams } = useSnippetParams();

  const { languages: languagesParam, tagIds: tagIdsParam } = getParams();

  // Handle snippet deletion and refetch

  const hasFilters = search || languagesParam || tag;

  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}

          {/* Language filter */}
          <div className="w-full sm:w-48">
            {/* <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.name} value={lang.name}>
                    {lang.name} ({lang.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>

          {/* Clear filters button */}
          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={clearParams}
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Active tag filter */}
        {tag && (
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">
              Active filter:
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              #{tag}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 -mr-1"
                onClick={() => setTag("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {hasFilters && " with current filters"}
      </div>

      {/* Snippets grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-md shadow-sm h-72 animate-pulse bg-card"
            />
          ))}
        </div>
      ) : snippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.publicId} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-4xl">🔍</div>
          <h3 className="text-lg font-medium mb-2">No snippets found</h3>
          <p className="text-muted-foreground">
            {hasFilters
              ? "Try changing your filters or create a new snippet."
              : "Start adding code snippets to your collection."}
          </p>
          {hasFilters && (
            <Button variant="outline" className="mt-4" onClick={clearParams}>
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
