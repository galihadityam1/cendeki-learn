import { UserModel } from "@/db/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let body = await request.json();
    const age = Number(body.age);
    const checkUserEmail = await UserModel.checkUserEmail(body.email);

    if (checkUserEmail) {
      return NextResponse.json(
        {
          message: "Email already used",
        },
        {
          status: 404,
        },
      );
    }

    body.age = age;

    const result = await UserModel.addUser(body);

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
