import { Router } from "express";

const router = Router();
const testData = {
  _id: 1,
  text: "test",
};
router.get("/api/test", (request, response) => {
  response.send(testData);
});

export default router;
