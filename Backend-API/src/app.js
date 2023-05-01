import express from "express";
import swaggerDocument from "../swagger_output.json" assert { type: "json" };
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

export default app;
