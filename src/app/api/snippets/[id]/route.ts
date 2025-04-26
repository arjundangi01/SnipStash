// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";
// import { getSnippetById, updateSnippet, deleteSnippet } from "@/lib/snippets";
// import { z } from "zod";

// const snippetUpdateSchema = z.object({
//   title: z.string().min(1).max(255).optional(),
//   code: z.string().min(1).optional(),
//   language: z.string().min(1).optional(),
//   description: z.string().optional().nullable(),
//   tags: z.array(z.string()).optional(),
// });

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const snippet = await getSnippetById(params.id, session.user.id as string);

//     if (!snippet) {
//       return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
//     }

//     return NextResponse.json(snippet);
//   } catch (error) {
//     console.error("Error fetching snippet:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     // Validate input
//     const result = snippetUpdateSchema.safeParse(body);
//     if (!result.success) {
//       return NextResponse.json(
//         { error: "Invalid input", details: result.error.format() },
//         { status: 400 }
//       );
//     }

//     const updatedSnippet = await updateSnippet(
//       params.id,
//       result.data,
//       session.user.id as string
//     );

//     return NextResponse.json(updatedSnippet);
//   } catch (error) {
//     console.error("Error updating snippet:", error);

//     if (
//       error instanceof Error &&
//       error.message.includes("not found or unauthorized")
//     ) {
//       return NextResponse.json({ error: error.message }, { status: 404 });
//     }

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await deleteSnippet(params.id, session.user.id as string);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting snippet:", error);

//     if (
//       error instanceof Error &&
//       error.message.includes("not found or unauthorized")
//     ) {
//       return NextResponse.json({ error: error.message }, { status: 404 });
//     }

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
