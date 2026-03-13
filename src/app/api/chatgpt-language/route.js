import { RAPID_API } from "@/db/config/constant";
import { StoryModel } from "@/db/models/storyModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const prompt = `make a story using english with ${query} as topic in object with property like below and not json, 
    {
     "fullStory": story in 5 senteces,
     "story": fullStory that remove 2 words in every sentece from fullStory replace by '----' dont remove person's name, and that words not side by side then the word that removed replaced word by '----' rembember replace it with '----',
     "answer": [words that removed from story, the total must be same with the word that removed, order by what removed first]
     }
{
"fullStory": string,
"story": string,
"answer": string[]
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
