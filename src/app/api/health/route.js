import { NextResponse } from "next/server";
import { getConnectionStatus, connectToDatabase } from "@/db/config/mongodb";

export async function GET() {
  try {
    const status = getConnectionStatus();
    
    // Try to connect if not already connected
    if (!status.isConnected) {
      await connectToDatabase();
    }
    
    // Get updated status after connection attempt
    const finalStatus = getConnectionStatus();
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        ...finalStatus,
        healthy: finalStatus.isConnected
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
      database: {
        isConnected: false,
        healthy: false
      }
    }, { status: 500 });
  }
}
