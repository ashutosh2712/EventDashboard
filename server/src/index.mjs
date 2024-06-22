import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express Server Started at port ${PORT}`);
  console.log("http://localhost:3000/");
});
