import express from "express";

const app = express();

app.get("/status", (_, res) => {
  res.status(200);
  res.json({ message: "app is running" });
});

export default app;
