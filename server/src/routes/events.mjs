import { Router } from "express";
import Events from "../schemas/Events.mjs";
import authenticateToken from "../middleware/authmiddleware.mjs";
const router = Router();

router.post("/api/events", authenticateToken, async (request, response) => {
  const { userId } = request.user;
  const events = request.body.events;

  try {
    const eventObjects = events.map((event) => ({
      userId,
      type: event.type,
      data: event.data,
      timestamp: new Date(),
    }));

    const savedEvents = await Events.insertMany(eventObjects);
    response.status(201).json(savedEvents);
  } catch (error) {
    response.status(500).send("Error recording events");
  }
});

router.get("/api/events", authenticateToken, async (request, response) => {
  const { userId } = request.user;

  try {
    const events = await Events.find({ userId });
    response.json(events);
  } catch (error) {
    response.status(500).send("Error fetching events");
  }
});

export default router;
