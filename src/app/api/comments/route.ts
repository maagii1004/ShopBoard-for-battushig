import { NextResponse } from "next/server";

interface Comment {
  comment: string;
  userName: string;
  ProfileImageUrl: string;
  date: string;
}

const commentsByProductId: Record<string, Comment[]> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const comments = commentsByProductId[productId] || [];
  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  try {
    const { productId, comment }: { productId: string; comment: Comment } = await req.json();

    if (!productId || !comment) {
      return NextResponse.json({ message: "Product ID and comment are required" }, { status: 400 });
    }

    if (!commentsByProductId[productId]) {
      commentsByProductId[productId] = [];
    }

    commentsByProductId[productId].push(comment);
    return NextResponse.json({ message: "Comment added successfully!" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to add comment" }, { status: 400 });
  }
}