import jwt from "jsonwebtoken";
import * as jose from "jose";

const key = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export const signToken = (payload) => jwt.sign(payload, key);

export const verifyToken = async (jwt) => {
  const secret = new TextEncoder().encode(key);
  const result = await jose.jwtVerify(jwt, secret);

  return result.payload;
};
