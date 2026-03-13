import { RAPID_API } from "@/db/config/constant";
import { StoryModel } from "@/db/models/storyModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const prompt = `Tell the history of ${query} based on the original story, in the following JSON format:
  {
  "fullStory": the story in 5 sentences,
  "story": the full story with 2 words missing from each sentence (these words should not be adjacent), and replaced with '----'.
  "answer": an array of the words that were removed from the story, in the order they were removed. The number of words removed must match the number of '----' placeholders, and they should be ordered in the same sequence as they were removed from the story.
  }`;

    if (req.method !== "POST")
      return res.send({
        success: false,
        message: `${req.method} Method Not Allowed`,
      });

    const options = {
      method: "POST",
      url: "https://enterprise-edition-chat-gpt-3-5-turbo.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": RAPID_API,
        "x-rapidapi-host":
          "enterprise-edition-chat-gpt-3-5-turbo.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    };

    const { data } = await axios.request(options);
    console.log(data.choices[0].message.content, "API");
    const object = JSON.parse(data.choices[0].message.content);
    object.title = query;
    object.category = "history";
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
      errMsg: "Error GPT API failed",
    });
  }
}
