import { useTags } from "@/src/hooks/tags";
import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { useSnippetParams } from "../snippets/_hooks/useSnippetParams";
const TagsFilter = () => {
  const { data: tags, isLoading } = useTags();
  const { getParams, setParams } = useSnippetParams();
  const { tagIds } = getParams();

  return (
    <div>
      <p>Filter by tag</p>
      <div className="flex flex-wrap gap-2 my-2 max-w-full overflow-x-auto">
        {tags?.tags.map((tag) => (
          <Badge
            onClick={() => {
              setParams({ tagId: tag.publicId });
            }}
            variant={tagIds?.includes(tag.publicId) ? "default" : "outline"}
            key={tag.publicId}
            className="cursor-pointer"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsFilter;
