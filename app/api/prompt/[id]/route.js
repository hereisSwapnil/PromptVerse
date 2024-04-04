import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ createdBy: params.id }).populate(
      "createdBy"
    );
    if (!prompts) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
      const prompts = await Prompt.findOneAndDelete({ createdBy: params.id }).populate(
        "createdBy"
      );
      if (!prompts) {
        return new Response(JSON.stringify({ error: "Prompt not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  };
  
