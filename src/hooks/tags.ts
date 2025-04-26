import { useQuery } from "@tanstack/react-query";
import { SnippetAPI } from "@/src/api/snippet";
export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: SnippetAPI.getTags,
  });
};
