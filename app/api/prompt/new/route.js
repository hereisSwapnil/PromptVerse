import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      createdBy: userId,
      prompt,
      tag,
    });
    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
