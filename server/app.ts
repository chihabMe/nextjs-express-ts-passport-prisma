import dotenv from "dotenv";
import { createServer } from "./utils/server";
import https from "https";
import fs from "fs";

dotenv.config();

const runServer = async () => {
  try {
    const app = await createServer();
    const port = process.env.PORT ?? 3000;

    app.listen(port, () => console.log(`running on port ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
const runServerOnHttps = async () => {
  try {
    const app = await createServer();
    const port = process.env.PORT ?? 3000;
    const privateKey = fs.readFileSync(
      "./server/sslcert/selfsigned.key",
      "utf8"
    );
    const certificate = fs.readFileSync(
      "./server/sslcert/selfsigned.crt",
      "utf8"
    );

    https
      .createServer(
        {
          key: privateKey,
          cert: certificate,
        },
        app
      )
      .listen(port, () => console.log(`dev https running on port ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (require.main == module) {
  const arg = process.argv[3];
  if (arg == "https") runServerOnHttps();
  else runServer();
}
