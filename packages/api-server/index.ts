import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

const t = initTRPC.create();

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hi";
  }),

  logToServer: t.procedure.input(String).mutation((req) => {
    console.log(req.input);
    return true;
  }),
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
