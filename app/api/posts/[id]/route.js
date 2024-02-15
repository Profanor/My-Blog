import main from "@/config/database";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newContent: content } = await request.json();
    await main();
    await Posts.findByIdAndUpdate(id, { title, content });
    return NextResponse.json({ message: "Post updated successfully"}, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await main();
    const topic = await Posts.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
}