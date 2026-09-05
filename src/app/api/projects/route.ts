import { NextResponse } from "next/server";
import { getDbProjects } from "@/lib/db-service";

export async function GET() {
  try {
    const projects = await getDbProjects();
    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects from database." },
      { status: 500 }
    );
  }
}
