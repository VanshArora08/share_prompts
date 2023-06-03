import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// read prompt
export const GET = async(req,{params})=>{
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt not found",{status:404})
        return new Response(JSON.stringify(prompt),{status:200})

    }catch(err){
        return new Response("Failed to get prompt",{status:500})
    }
}

// update prompt

export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json();
    try{
        await connectToDB();
        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found",{status:404})
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:200})

    }catch(err){
        return new Response("Failed to update prompt",{status:500})
    }
}

export const DELETE = async(req,{params})=>{
    try{
        await connectToDB();
        await Prompt.deleteOne({_id:params.id})
        console.log("deleted prompt");
        return new Response("Prompt deleted",{status:200})
    }catch(err){
        console.log("delete prompt failed");
        return new Response("Failed to delete prompt",{status:500})
    }
}