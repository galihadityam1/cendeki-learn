import { StoryModel } from "@/db/models/storyModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("journey");

    if (!category) {
      return NextResponse.json(
        {
          status: 400,
          error: "Category parameter is required",
        },
        { status: 400 },
      );
    }

    console.log("Fetching stories for category:", category);
    const data = await StoryModel.getStoryByCategory(category);

    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.error("Error in GET /api/journey/collect:", error);
    return NextResponse.json(
      {
        status: 500,
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const storyId = new ObjectId(String(body));
    const data = await StoryModel.getStoryById(storyId);

    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.error("Error in POST /api/journey/collect:", error);
    return NextResponse.json(
      {
        status: 500,
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
