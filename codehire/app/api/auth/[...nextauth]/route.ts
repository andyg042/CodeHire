// app/api/debug-auth/route.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { handlers } from "@/auth"

export const { GET, POST } = handlers