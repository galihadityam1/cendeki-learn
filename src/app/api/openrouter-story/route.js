export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const category = searchParams.get("category") || "history";

    if (req.method !== "POST")
      return res.send({
        success: false,
        message: `${req.method} Method Not Allowed`,
      });

    // Mock response since API calls are failing
    const mockObject = {
      title: query || "Generated Story",
      story: `This is a mock story about ${query}. There are ___1___ blanks to fill in this ___2___ story. The ___3___ is interesting and ___4___ for learning. This ___5___ helps students practice.`,
      fullStory: `This is a mock story about ${query}. There are several blanks to fill in this interactive story. The content is interesting and helpful for learning. This exercise helps students practice.`,
      answer: ["several", "interactive", "content", "helpful", "exercise"],
      category: category,
    };

    let res = await StoryModel.addStory(mockObject);
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
      errMsg: "Error generating story",
    });
  }
}
