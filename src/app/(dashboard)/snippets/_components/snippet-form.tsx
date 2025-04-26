"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea";

import { FormInputWrapper } from "../../../../components/form/formInputWrapper";

import { languageOptions, SnippetFormValues } from "../_utils/snippetForm";
import { snippetFormSchema } from "../_utils/snippetForm";
import { useSubmitSnippet } from "../_hooks/useSubmitSnippet";
import SelectTags from "./select-tags";
import { GetSnippetQuery } from "@/src/gql/graphql";

// Define the schema for the form

// Props for the SnippetForm component
interface SnippetFormProps {
  snippet?: GetSnippetQuery["snippet"];
  isEditing?: boolean;
  mode: "create" | "update" | "delete";
}

export function SnippetForm({
  snippet,
  isEditing = false,
  mode,
}: SnippetFormProps) {
  const router = useRouter();

  const { handleSubmit, isCreating, isUpdating, isDeleting } = useSubmitSnippet(
    {
      mode,
    }
  );

  // Initialize the form
  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),
    defaultValues: {
      title: snippet?.title || "",
      code: snippet?.code || "",
      language: snippet?.language || "javascript",
      description: snippet?.description || "",
      tags: snippet?.snippetTags?.map((tag) => tag.tag?.name) || [],
      publicId: snippet?.publicId || "",
    },
  });

  const language = form.watch("language");

  // Handle form submission
  const onSubmit = async (data: SnippetFormValues) => {
    handleSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          <div className="space-y-6">
            <FormInputWrapper
              form={form}
              fieldConfig={{
                name: "title",
                label: "Title",
                placeHolder: "My awesome snippet",
                fieldVariant: "input",
              }}
            />

            <FormInputWrapper
              form={form}
              fieldConfig={{
                fieldVariant: "select",
                name: "language",
                label: "Language",
                placeHolder: "Select a language",
                options: languageOptions,
              }}
            />

            <FormInputWrapper
              form={form}
              fieldConfig={{
                name: "description",
                label: "Description",
                fieldVariant: "textArea",
                placeHolder: "Enter a brief description",
              }}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <SelectTags
                      onChange={field.onChange}
                      value={field.value}
                      form={form}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your code here"
                      className="font-mono min-h-[400px] resize-none"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues("code") && (
              <div>
                <div className="text-sm font-medium mb-1">Preview:</div>
                <div className="border rounded-md overflow-hidden">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      maxHeight: "200px",
                      overflow: "auto",
                    }}
                    showLineNumbers={true}
                  >
                    {form.getValues("code")}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating || isDeleting}
          >
            {isCreating || isUpdating || isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Snippet"
            ) : (
              "Save Snippet"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
