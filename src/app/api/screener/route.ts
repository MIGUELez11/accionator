import { getScreening, Screeners } from "@/server/stocks/getScreening";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const screener = searchParams.get("screener");
  if (!screener) {
    return NextResponse.json(
      { error: "Screener is required" },
      { status: 400 },
    );
  }
  const data = await getScreening(screener as Screeners);
  return NextResponse.json(data);
}
