import { z } from "zod";

export const snippetFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title cannot exceed 255 characters" }),
  code: z.string().min(1, { message: "Code is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  description: z.string().optional(),
  tags: z.array(z.string()),
  publicId: z.string().optional(),
});

// Define the type for the form values
export type SnippetFormValues = z.infer<typeof snippetFormSchema>;

// Languages options
export const languageOptions = [
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "HTML", value: "html" },
  { name: "CSS", value: "css" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "C#", value: "csharp" },
  { name: "C++", value: "cpp" },
  { name: "Ruby", value: "ruby" },
  { name: "Go", value: "go" },
  { name: "PHP", value: "php" },
  { name: "SQL", value: "sql" },
  { name: "Bash", value: "bash" },
  { name: "JSON", value: "json" },
  { name: "Markdown", value: "markdown" },
  { name: "YAML", value: "yaml" },
];
