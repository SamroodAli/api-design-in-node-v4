import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { errorHandler } from "./handlers/error";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);

app.post("/sign-up", createNewUser);
app.post("/sign-in", signIn);

app.get(["/", "/status"], (_, res) => {
  res.status(200);
  res.json({ message: "app design in node v4 is running" });
});

app.use(errorHandler);

export default app;
