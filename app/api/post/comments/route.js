import main from "@/config/database";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const comment = formData.get("comment");

  if (!name || !comment) {
    throw new Error("Name or comment is missing");
  }

  await main();
  await Comment.create({ name, email, comment });
  return NextResponse.json({ message: "Comment Created successfully" }, { status: 201 });
}

export async function GET() {
  await main();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}
