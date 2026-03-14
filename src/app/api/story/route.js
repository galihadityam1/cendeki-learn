import { StoryModel } from "@/db/models/storyModel";
import { NextResponse } from "next/server";

export async function POST() {
  // Return mock data since geminiAI is removed
  const mockResult = {
    fullStory:
      "Pangeran Diponegoro adalah pahlawan nasional yang memimpin perlawanan melawan Belanda di Jawa. Ia berperang dengan gagah berani selama bertahun-tahun untuk mempertahankan kemerdekaan bangsanya.",
    story:
      "Pangeran Diponegoro adalah ---- nasional yang memimpin ---- melawan Belanda di Jawa. Ia ---- dengan gagah berani selama ---- tahun untuk mempertahankan ---- bangsanya.",
    answer: [
      "pahlawan",
      "perlawanan",
      "berperang",
      "bertahun-tahun",
      "kemerdekaan",
    ],
  };

  const res = await StoryModel.addStory({ result: mockResult });
  const story = await StoryModel.getStoryById(res.insertedId);

  return NextResponse.json({ data: story }, { status: 201 });
}
