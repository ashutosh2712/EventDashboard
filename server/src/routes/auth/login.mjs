import { Router } from "express";
import { Users } from "../../schemas/Users.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
const jwtsecret =
  "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";
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
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      jwtsecret,
      {
        expiresIn: "1h",
      }
    );
    console.log({ username: user.username, email: user.email, token });
    response.json({ token });
  } catch (error) {
    response.status(500).json({ error: "Error while Login in!Try again" });
  }
});

router.post("/auth/logout", (request, response) => {
  response.status(200).send("Logout Successfully");
});

export default router;
