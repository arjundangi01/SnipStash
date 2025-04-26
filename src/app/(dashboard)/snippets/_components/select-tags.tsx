"use client";

import { Tag, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { FormLabel } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

import { Badge } from "@/src/components/ui/badge";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface SelectTagsProps {
  value: string[];
  onChange: (tags: string[]) => void;
  form: UseFormReturn<any>;
}

const SelectTags = ({ value = [], onChange, form }: SelectTagsProps) => {
  const [tags, setTags] = useState<string[]>(value);
  const [newTag, setNewTag] = useState("");
  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim().toLowerCase())) {
        const newTags = [...tags, newTag.trim().toLowerCase()];
        setTags(newTags);
        onChange(newTags);
        setNewTag("");
      }
    }
  };

  // Add a tag
  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onChange(newTags);
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="space-y-2 py-4">
      <FormLabel>Tags</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-sm py-1 px-2">
            {tag}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 -mr-1"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Add a tag and press Enter"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => {
            if (newTag.trim()) {
              addTag(newTag.trim().toLowerCase());
              setNewTag("");
            }
          }}
        >
          <Tag className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SelectTags;
