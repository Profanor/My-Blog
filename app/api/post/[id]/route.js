import main from "@/config/database";
import Posts from "@/models/Posts";
import mongoose from 'mongoose';
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        
        // Ensure id is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            throw new Error('Invalid ObjectId');
        }

        const { newTitle: title, newContent: content } = await request.json();
        await main();
        
        // Use mongoose.Types.ObjectId to create an ObjectId instance
        const postId = mongoose.Types.ObjectId(id);
        
        // Update the post using findByIdAndUpdate
        await Posts.findByIdAndUpdate(postId, { title, content });

        return new Response(JSON.stringify({ message: "Post updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
    }
}


export async function GET(request, { params }) {
    const { postId } = params;
    try {
        await main();
        const post = await Posts.findById({ _id: postId });
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
