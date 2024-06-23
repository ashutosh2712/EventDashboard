import { Router } from "express";
import Events from "../schemas/Events.mjs";
import authenticateToken from "../middleware/authmiddleware.mjs";
const router = Router();

router.post("/api/events", authenticateToken, async (request, response) => {
  try {
    const { events } = request.body;
    await Events.insertMany(events);
  } catch (error) {
    response.status(500).send("Error recording events");
  }
});

router.get("/api/events", authenticateToken, async (request, response) => {
  try {
    const events = await Events.find();
    response.status(200).json(events);
  } catch (error) {
    response.status(500).send("Error fetching events");
  }
});

export default router;
