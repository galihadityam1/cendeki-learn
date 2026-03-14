import { UserModel } from "@/db/models/userModel";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const id = headers().get("x-id-user");
  let profile = await UserModel.findProfile(id);
  return NextResponse.json({
    status: 200,
    data: profile,
  });
}

export async function PATCH(request) {
  try {
    const idUser = headers().get("x-id-user");
    let body = await request.json();
    const { fullname, bio, age } = body;

    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (bio) updateData.bio = bio;
    if (age) updateData.age = age;

    await UserModel.updateProfile({ idUser, ...updateData });
    const data = await UserModel.findProfile(idUser);

    return NextResponse.json({
      status: 201,
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
