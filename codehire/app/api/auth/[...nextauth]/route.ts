// app/api/debug-auth/route.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { handlers } from "@/auth"


// export async function GET() {
//   const session = await auth()
//   return NextResponse.json({ session })
// }
export const { GET, POST } = handlers