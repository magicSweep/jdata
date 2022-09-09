import { init } from "./init";
/* import {
  //herokuPingUrl,
  selfDomainNameHeroku,
  selfDomainNameLocal,
} from "./config"; */

const port = parseInt(process.env.PORT as string, 10) || 3009;

let server: any;

const start = async () => {
  const app = await init();

  server = app.listen(port, () => {
    console.log(`> Ready on port: ${port}`);
  });
};

process.on("unhandledRejection", (err: Error) => {
  console.error(err);

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.error("SIGTERM received");

  server.close(() => {
    process.exit(1);
  });
});

start();
