import { NextResponse } from "next/server";
import { ScoreService } from "@/services/scoreService";

/**
 * POST /api/scoring
 * Create a new score
 */
export async function POST(request) {
  try {
    const userId = request.headers.get("x-id-user");
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - User ID required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = await ScoreService.createScore(body, userId);
    
    return NextResponse.json({
      success: true,
      data: result.data
    }, { status: 201 });
  } catch (error) {
    console.error("Scoring POST error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Failed to create score",
        code: error.code || "INTERNAL_ERROR",
        errors: error.errors || null
      },
      { status: error.status || 500 }
    );
  }
}

/**
 * GET /api/scoring
 * Get leaderboard data
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const userId = searchParams.get("userId");
    
    let result;
    
    if (userId) {
      // Get user's best scores
      result = await ScoreService.getUserBestScores(userId, limit);
    } else {
      // Get leaderboard
      result = await ScoreService.getLeaderboard(limit);
    }
    
    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error("Scoring GET error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Failed to get scores",
        code: error.code || "INTERNAL_ERROR"
      },
      { status: error.status || 500 }
    );
  }
}
