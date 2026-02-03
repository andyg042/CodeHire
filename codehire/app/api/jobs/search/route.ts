import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // default query if none provided
  const query = searchParams.get("query") ?? "software engineer";

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=1&num_pages=1`;

  // Fetcgh data from external API serverside
  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    cache: "no-store", // disables Next.js caching
  });

  // Handles error responses, returns the error status and message
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: res.status }
    );
  }

  // Parse and return the JSON data
  const data = await res.json();
  return NextResponse.json(data);
}
