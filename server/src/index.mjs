import express from "express";
import mongoose from "mongoose";
import testRouter from "./routes/test.mjs";
import registerRouter from "./routes/auth/register.mjs";
import loginRouter from "./routes/auth/login.mjs";
import homeRouter from "./routes/home.mjs";
const app = express();

app.use(express.json());
app.use(testRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(homeRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express Server Started at port ${PORT}`);
  console.log("http://localhost:3000/");
});

mongoose
  .connect("mongodb://localhost:27017/event_dashboard")
  .then(console.log("Connected to mongoDb database!"))
  .catch((err) => console.log(`Error connecting to Db:${err}`));
