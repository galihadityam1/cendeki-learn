import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: 200,
    message: "API is working",
    timestamp: new Date().toISOString(),
  });
}
