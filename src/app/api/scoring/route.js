import { ScoreModel } from "@/db/models/scoreModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let body = await request.json();
    const userId = request.headers.get("x-id-user");
    const playDate = new Date();

    const score = await ScoreModel.addScore({
      userId,
      score: body.score,
      storyId: body.storyId,
      playDate,
    });

    return NextResponse.json({
      status: 201,
      data: score,
      message: "Score added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
