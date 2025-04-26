import React from "react";
import { useSnippetParams } from "../snippets/_hooks/useSnippetParams";
import { languageOptions } from "../snippets/_utils/snippetForm";
import { Badge } from "@/src/components/ui/badge";
const LanguagesFilter = () => {
  const { getParams, setParams } = useSnippetParams();

  return (
    <div>
      <p>Filter by language</p>
      <div className="flex flex-wrap gap-2 my-2 max-w-full overflow-x-auto">
        {languageOptions.map((language) => (
          <Badge
            key={language.value}
            variant={
              getParams().languages?.includes(language.value)
                ? "default"
                : "outline"
            }
            onClick={() => setParams({ language: language.value })}
            className="cursor-pointer"
          >
            {language.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LanguagesFilter;
