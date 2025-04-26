import { useMutation, useQuery } from "@tanstack/react-query";
import { SnippetAPI } from "@/src/api/snippet";
import { CreateSnippet, SnippetsInput } from "../gql/graphql";

export const useSnippets = (query: SnippetsInput) => {
  return useQuery({
    queryKey: ["snippets", query],
    queryFn: () => SnippetAPI.getSnippets(query),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useSnippet = (id: string) => {
  return useQuery({
    queryKey: ["snippet", id],
    queryFn: () => SnippetAPI.getSnippet(id),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useCreateSnippet = () => {
  return useMutation({
    mutationFn: SnippetAPI.createSnippet,
    mutationKey: ["createSnippet"],
  });
};

export const useUpdateSnippet = () => {
  return useMutation({
    mutationFn: SnippetAPI.updateSnippet,
    mutationKey: ["updateSnippet"],
  });
};

export const useDeleteSnippet = () => {
  return useMutation({
    mutationFn: SnippetAPI.deleteSnippet,
    mutationKey: ["deleteSnippet"],
  });
};
