import { NextResponse } from "next/server";
import { UserService } from "@/services/userService";

/**
 * GET /api/profile
 * Get user profile
 */
export async function GET(request) {
  try {
    const userId = request.headers.get("x-id-user");
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - User ID required" },
        { status: 401 }
      );
    }

    const result = await UserService.getProfile(userId);
    
    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Failed to get profile",
        code: error.code || "INTERNAL_ERROR"
      },
      { status: error.status || 500 }
    );
  }
}

/**
 * PATCH /api/profile
 * Update user profile
 */
export async function PATCH(request) {
  try {
    const userId = request.headers.get("x-id-user");
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - User ID required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = await UserService.updateProfile(userId, body);
    
    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("Profile PATCH error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Failed to update profile",
        code: error.code || "INTERNAL_ERROR",
        errors: error.errors || null
      },
      { status: error.status || 500 }
    );
  }
}
