import main from "@/config/database";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function POST(req) {
      const { title, content } = await req.json();
      await main();
      await Posts.create({title, content});
      return NextResponse.json({message: "Post Created successfully"}, { status: 201 });
}

export async function GET() {
  await main();
  const posts = await Posts.find();
  return NextResponse.json({ posts })
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await main();
  await Posts.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted successfully"}, { status: 200 });
}