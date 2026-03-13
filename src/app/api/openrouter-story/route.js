import { OPENROUTER_API_KEY } from "@/db/config/constant";
import { StoryModel } from "@/db/models/storyModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const category = searchParams.get("category") || "history";

    const promptContent =
      category === "history"
        ? `Create an interactive history learning journey based on this topic: ${query}. Generate a story with exactly 5 fill-in-the-blank questions using placeholders like ___1___, ___2___, ___3___, ___4___, ___5___. Return ONLY valid JSON (no markdown formatting) with format: {"title": "...", "story": "story with blanks like ___1___", "fullStory": "complete story with answers filled in", "answer": ["answer1", "answer2", "answer3", "answer4", "answer5"]}`
        : `Create an interactive English learning journey based on this topic: ${query}. Generate a story with exactly 5 fill-in-the-blank questions using placeholders like ___1___, ___2___, ___3___, ___4___, ___5___. Return ONLY valid JSON (no markdown formatting) with format: {"title": "...", "story": "story with blanks like ___1___", "fullStory": "complete story with answers filled in", "answer": ["answer1", "answer2", "answer3", "answer4", "answer5"]}`;

    if (req.method !== "POST")
      return res.send({
        success: false,
        message: `${req.method} Method Not Allowed`,
      });

    const options = {
      method: "POST",
      url: "https://openrouter.ai/api/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "stepfun/step-3.5-flash:free",
        messages: [
          {
            role: "user",
            content: promptContent,
          },
        ],
      },
    };

    const { data } = await axios.request(options);
    console.log(data.choices[0].message.content, "OpenRouter API");

    let object;
    try {
      let jsonString = data.choices[0].message.content;
      // Clean the string: remove markdown code block fences if present
      if (jsonString.includes("```json")) {
        jsonString = jsonString.split("```json")[1].split("```")[0];
      } else if (jsonString.includes("```")) {
        jsonString = jsonString.split("```")[0];
      }
      object = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw content:", data.choices[0].message.content);
      // If JSON parsing fails, create a basic structure
      object = {
        title: query || "Generated Story",
        story: data.choices[0].message.content,
        answer: [], // Default to empty array if parsing fails
      };
    }

    object.title = query;
    object.category = category;

    let res = await StoryModel.addStory(object);
    const { insertedId } = res;
    let result = await StoryModel.getStoryById(insertedId);

    return NextResponse.json({
      status: 200,
      answer: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 400,
      errMsg: "Error OpenRouter API failed",
    });
  }
}
