import { NextResponse } from "next/server";
import { getDbBlogPosts } from "@/lib/db-service";

export async function GET() {
  try {
    const posts = await getDbBlogPosts();
    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles from database." },
      { status: 500 }
    );
  }
}
