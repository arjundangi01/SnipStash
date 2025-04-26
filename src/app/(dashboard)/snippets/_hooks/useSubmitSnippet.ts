import {
  useCreateSnippet,
  useDeleteSnippet,
  useUpdateSnippet,
} from "@/src/hooks/useSnippet";
import { SnippetFormValues } from "../_utils/snippetForm";
import { openErrorToast, openSuccessToast } from "@/src/components/toast/toast";
import { useRouter } from "next/navigation";
import { AppRouts } from "@/src/lib/app-routes";
export const useSubmitSnippet = ({
  mode,
}: {
  mode: "create" | "update" | "delete";
}) => {
  const { mutate: createSnippet, isPending: isCreating } = useCreateSnippet();
  const { mutate: updateSnippet, isPending: isUpdating } = useUpdateSnippet();
  const { mutate: deleteSnippet, isPending: isDeleting } = useDeleteSnippet();
  const router = useRouter();

  const handleSubmit = (data: SnippetFormValues) => {
    if (mode === "create") {
      createSnippet(
        {
          tags: data.tags,
          code: data.code,
          language: data.language,
          title: data.title,
          description: data.description,
        },
        {
          onSuccess: () => {
            router.push(AppRouts.user.dashboard);
            openSuccessToast({ message: "Snippet created successfully" });
          },
          onError: (error) => {
            openErrorToast({ error });
          },
        }
      );
    }

    if (mode === "update") {
      if (!data.publicId) {
        openErrorToast({ message: "Public ID is required" });
        return;
      }

      updateSnippet(
        { ...data, publicId: data.publicId },
        {
          onSuccess: () => {
            openSuccessToast({ message: "Snippet updated successfully" });
          },
          onError: (error) => {
            openErrorToast({ error });
          },
        }
      );
    }

    if (mode === "delete") {
      if (!data.publicId) {
        openErrorToast({ message: "Public ID is required" });
        return;
      }

      deleteSnippet(
        { publicId: data.publicId },
        {
          onSuccess: () => {
            openSuccessToast({ message: "Snippet deleted successfully" });
          },
          onError: (error) => {
            openErrorToast({ error });
          },
        }
      );
    }
  };

  return { handleSubmit, isCreating, isUpdating, isDeleting };
};
