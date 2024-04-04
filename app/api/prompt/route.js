import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({}).populate("createdBy");
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
