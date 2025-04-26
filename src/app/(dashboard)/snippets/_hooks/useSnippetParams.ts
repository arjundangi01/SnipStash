import { useRouter, useSearchParams } from "next/navigation";

type SnippetParams = {
  languages?: string[];
  tagIds?: string[];
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
    params: Partial<SnippetParams>,
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

    if (params.languages) {
      params.languages.forEach((language) => {
        newParams.append(snippetParamsKeys.languages, language);
      });
    }

    if (params.tagIds) {
      params.tagIds.forEach((tagId) => {
        newParams.append(snippetParamsKeys.tagIds, tagId);
      });
    }

    // update the url
    router.push(`?${newParams.toString()}`);
  };

  const clearParams = () => {
    const newParams = new URLSearchParams();
    router.replace(`?${newParams.toString()}`);
  };

  return { getParams, setParams, clearParams };
};
