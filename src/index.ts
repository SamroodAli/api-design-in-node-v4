import * as dotenv from "dotenv";
import config from "./config";
import app from "./server";

dotenv.config();

app.listen(config.port, () => {
  console.log(`app listening on https://localhost:${config.port}`);
});
