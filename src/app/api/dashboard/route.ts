import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const user = await User.findById(session.user.id)
      .select("name email plan credits")
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        plan: user.plan,
        credits: user.credits,
      },
    });
  } catch (error) {
    console.error("Dashboard route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard data." },
      { status: 500 },
    );
  }
}
