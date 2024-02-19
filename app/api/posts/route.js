import main from "@/config/database";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";


export async function POST(req) {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image");
     
    if (!title || !content) {
      throw new Error("Title or content is missing");
    }

    let imageData;
    if (image) {
    // Read the image file data and store it in MongoDB
    const arrayBuffer = await new Response(image).arrayBuffer();
    imageData = {
      data: Buffer.from(arrayBuffer),
          contentType: image.type,
        };
      }
    await main();
    await Posts.create({title, content, image: imageData });
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