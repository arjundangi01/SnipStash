// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";
// import { createSnippet, getUserSnippets } from "@/lib/snippets";
// import { z } from "zod";

// const snippetCreateSchema = z.object({
//   title: z.string().min(1).max(255),
//   code: z.string().min(1),
//   language: z.string().min(1),
//   description: z.string().optional(),
//   tags: z.array(z.string()).optional(),
// });

// export async function POST(req: NextRequest) {
//   try {
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     // Validate input
//     const result = snippetCreateSchema.safeParse(body);
//     if (!result.success) {
//       return NextResponse.json(
//         { error: "Invalid input", details: result.error.format() },
//         { status: 400 }
//       );
//     }

//     const snippet = await createSnippet({
//       ...result.data,
//       userId: session.user.id as string,
//     });

//     return NextResponse.json(snippet, { status: 201 });
//   } catch (error) {
//     console.error("Error creating snippet:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const search = searchParams.get("search") || "";
//     const language = searchParams.get("language") || "";
//     const tag = searchParams.get("tag") || "";
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const limit = parseInt(searchParams.get("limit") || "10", 10);

//     const result = await getUserSnippets(session.user.id as string, {
//       search,
//       language,
//       tag,
//       page,
//       limit,
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error fetching snippets:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
