import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });

      return Response.json({ data: chatCompletion.choices[0]})
    } catch(err) {
      console.log(err)
      return Response.json({error: 'error'})
    }
  

}