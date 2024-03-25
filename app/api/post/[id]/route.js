import main from "@/config/database";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newContent: content } = await request.json();
        await main();
        await Posts.findByIdAndUpdate(id, { title, content });
        return new Response(JSON.stringify({ message: "Post updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
    }
}


export async function GET(request, { params }) {
    const { id } = params;
    try {
        await main();
        const post = await Posts.findById(id); 
        if (post) {
            return NextResponse.json({ post }, { status: 200 });
        } else {
            return NextResponse.error(new Error("Post not found"), { status: 404 });
        } 
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.error(error, { status: 500 });
    }
}