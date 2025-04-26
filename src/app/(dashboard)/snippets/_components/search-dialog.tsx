"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { Loader2, Code, Hash } from "lucide-react";

interface Snippet {
  id: string;
  title: string;
  language: string;
  tags: { id: string; name: string }[];
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Snippet[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Reset state when dialog opens
    if (open) {
      setSearch("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search || search.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/snippets?search=${encodeURIComponent(search)}&limit=10`
        );

        if (!response.ok) {
          throw new Error("Failed to search snippets");
        }

        const data = await response.json();
        setResults(data.snippets);
      } catch (error) {
        console.error("Error searching snippets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSelect = (snippetId: string) => {
    router.push(`/snippets/${snippetId}`);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search snippets..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {isLoading && (
          <div className="py-6 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <CommandEmpty>No results found.</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="Snippets">
            {results.map((snippet) => (
              <CommandItem
                key={snippet.id}
                onSelect={() => handleSelect(snippet.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span>{snippet.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {snippet.language}
                  </span>
                  {snippet.tags.slice(0, 3).map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center text-xs text-muted-foreground"
                    >
                      <Hash className="mr-0.5 h-3 w-3" />
                      {tag.name}
                    </div>
                  ))}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
