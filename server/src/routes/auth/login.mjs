import { Router } from "express";
import { Users } from "../../schemas/Users.mjs";
import bcrypt from "bcrypt";

const router = Router();

router.post("/auth/login", async (request, response) => {
  const { email, password } = request.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return response.status(400).json({ error: "User Not found" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response.status(400).json({ error: "Incorrect Password" });
    }
    console.log({ username: user.username, email: user.email });
    response.status(200).json({ message: "You are logged in" });
  } catch (error) {
    response.status(500).json({ error: "Error while Login in!Try again" });
  }
});

export default router;
