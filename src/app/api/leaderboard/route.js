import { ScoreModel } from "@/db/models/scoreModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 50;

  let data = await ScoreModel.getAllScore();
  // Apply limit if specified
  const limitedData = limit ? data.slice(0, limit) : data;

  return NextResponse.json({
    status: 200,
    data: limitedData,
  });
}
