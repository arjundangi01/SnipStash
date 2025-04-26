import { useRouter, useSearchParams } from "next/navigation";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

type SnippetParams = {
  languages?: string[];
  tagIds?: string[];
};

type SnippetParamsInput = {
  language: string;
  tagId: string;
};

const snippetParamsKeys = {
  languages: "languages",
  tagIds: "tagIds",
};

export const useSnippetParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = (): SnippetParams => {
    return {
      languages: searchParams
        .get(snippetParamsKeys.languages)
        ?.split(",")
        .filter((language) => language !== ""),
      tagIds: searchParams
        .get(snippetParamsKeys.tagIds)
        ?.split(",")
        .filter((tagId) => tagId !== ""),
    };
  };

  const setParams = (
    params: Partial<SnippetParamsInput>,
    persistPreviousParams = true
  ) => {
    const newParams = new URLSearchParams();
    const previousParams = getParams();

    // persist previous params in the url
    if (persistPreviousParams) {
      Object.entries(previousParams).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value as any);
        }
      });
    }

    if (params.language) {
      const languages = previousParams.languages || [];
      if (!languages.includes(params.language) && params.language !== "en") {
        newParams.set(
          snippetParamsKeys.languages,
          [...languages, params.language].join(",")
        );
      } else {
        newParams.set(
          snippetParamsKeys.languages,
          languages
            ?.filter((language) => language !== params.language)
            .join(",")
        );
      }
    }

    if (params.tagId) {
      const tagIds = previousParams.tagIds || [];
      if (!tagIds.includes(params.tagId)) {
        newParams.set(
          snippetParamsKeys.tagIds,
          [...tagIds, params.tagId].join(",")
        );
      } else {
        newParams.set(
          snippetParamsKeys.tagIds,
          tagIds?.filter((tagId) => tagId !== params.tagId).join(",")
        );
      }
    }

    // update the url
    router.replace(`?${newParams.toString()}`);
  };

  const clearParams = () => {
    const newParams = new URLSearchParams();
    router.replace(`?${newParams.toString()}`);
  };

  return { getParams, setParams, clearParams };
};
