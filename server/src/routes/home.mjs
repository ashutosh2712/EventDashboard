import { Router } from "express";

const router = Router();

router.get("/api/home", (request, response) => {
  response.send("HomePage");
});
export default router;
