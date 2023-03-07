import express from "express";
import router from "./router";

const app = express();

app.use("/api", router);

app.get("/status", (_, res) => {
  res.status(200);
  res.json({ message: "app is running" });
});

export default app;
