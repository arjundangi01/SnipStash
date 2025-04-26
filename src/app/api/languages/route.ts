// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";
// import { getUserLanguages } from "@/lib/snippets";

// export async function GET(req: NextRequest) {
//   try {
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const languages = await getUserLanguages(session.user.id as string);

//     return NextResponse.json(languages);
//   } catch (error) {
//     console.error("Error fetching languages:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
