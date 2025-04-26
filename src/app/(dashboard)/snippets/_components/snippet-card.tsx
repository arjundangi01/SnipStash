"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Check,
  Code,
  Copy,
  Edit,
  Hash,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { languageFileExtensions } from "@/src/lib/auto-tag";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { GetSnippetsQuery } from "@/src/gql/client/graphql";
import { useDeleteSnippet } from "@/src/hooks/useSnippet";
import { useQueryClient } from "@tanstack/react-query";
import { openErrorToast, openSuccessToast } from "@/src/components/toast/toast";
interface SnippetCardProps {
  snippet: GetSnippetsQuery["snippets"][0];
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteSnippet, isPending: isDeleting } = useDeleteSnippet();

  // Format the creation date
  const formattedDate = formatDistanceToNow(new Date(), {
    addSuffix: true,
  });

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);

    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied to your clipboard",
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Handle edit
  const handleEdit = () => {
    router.push(`/snippets/${snippet.publicId}/edit`);
  };

  // Handle delete
  const handleDelete = async () => {
    deleteSnippet(
      {
        publicId: snippet.publicId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["snippets"],
          });
          openSuccessToast({ message: "Snippet deleted" });
        },
        onError: (error) => {
          openErrorToast({ error });
        },
      }
    );
  };

  const handleClick = () => {
    router.push(`/snippets/${snippet.publicId}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border group h-full flex flex-col">
          <CardHeader className="pb-4 pt-5 px-5 flex-row justify-between items-start gap-2">
            <div>
              <CardTitle className="text-lg font-semibold line-clamp-1">
                <Link
                  href={`/snippets/${snippet.publicId}`}
                  className="hover:underline"
                >
                  {snippet.title}
                </Link>
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Code className="h-3 w-3 mr-1" />
                <span className="capitalize">{snippet.language}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="p-0 flex-1">
            <div className="relative overflow-hidden rounded-sm max-h-64">
              <div className="relative h-full">
                <div className="overflow-x-auto" onClick={handleClick}>
                  <SyntaxHighlighter
                    language={snippet.language.toLowerCase()}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      height: "100%",
                      maxHeight: "16rem",
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                    showLineNumbers={true}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-5 py-4 flex flex-wrap gap-1.5">
            {snippet.snippetTags?.slice(0, 5).map((tag) => (
              <Badge
                key={tag.tag?.publicId}
                variant="secondary"
                className="flex items-center gap-0.5"
              >
                <Hash className="h-3 w-3" />
                {tag.tag?.name}
              </Badge>
            ))}
            {snippet?.snippetTags?.length &&
              snippet?.snippetTags?.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{snippet.snippetTags?.length - 5} more
                </Badge>
              )}
          </CardFooter>

          {/* Copy button overlay */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-12 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </Card>
      </motion.div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              snippet and all associated tags.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
