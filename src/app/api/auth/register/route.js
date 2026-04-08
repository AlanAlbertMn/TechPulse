// /app/api/auth/register/route.js
import { connectDB } from "@/lib/db";
// import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json(user);
}