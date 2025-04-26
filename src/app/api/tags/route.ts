// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";
// import { getUserTags } from "@/lib/snippets";

// export async function GET(req: NextRequest) {
//   try {
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const tags = await getUserTags(session.user.id as string);

//     return NextResponse.json(tags);
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
