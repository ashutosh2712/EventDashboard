import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();
import { Users } from "../../schemas/Users.mjs";

router.post("/auth/register", async (request, response) => {
  const { username, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new Users({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log({ username, email });
    response.status(201).json({ message: "Account Created!" });
  } catch (error) {
    response.status(500).send("Error while registering the user!");
  }
});

export default router;
