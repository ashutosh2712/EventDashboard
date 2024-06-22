import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();
import { Users } from "../../schemas/Users.mjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtsecret =
  "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";
router.post("/auth/register", async (request, response) => {
  const { username, email, password } = request.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, jwtsecret, {
      expiresIn: "1h",
    });
    console.log({ username, email, token });
    response
      .status(201)
      .send({ token, username: savedUser.username, email: savedUser.email });
  } catch (error) {
    console.log("error:", error);
    response.status(500).send({ error: "Error while registering user:" });
  }
});

export default router;
