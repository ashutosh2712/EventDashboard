import { Router } from "express";
import authenticateToken from "../middleware/authmiddleware.mjs";
const router = Router();

router.get("/api/home", authenticateToken, (request, response) => {
  response.send("HomePage" + request.user.userId);
});
export default router;
