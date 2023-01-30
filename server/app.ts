import dotenv from "dotenv";
import { createServer } from "./utils/server";

dotenv.config();

const runServer = () => {
  try {
    const app = createServer();
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => console.log(`running on port ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runServer();