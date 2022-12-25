import express from "express";
//import fs from "fs";
//import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import {
  errorHandle,
  notFoundHandle,
  logErrors,
} from "./helper/errorHandler.js";
import { connectDB } from "./service/mongoose.js";
import api from "./router/api.js";

const rootApi = "/api/v1";

const app = express();

dotenv.config();

// Security
//app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());

//app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// database
connectDB();

// static
//app.use("/documents", express.static(path.join(ROOT_FOLDER, "documents")));

// test api
app.get("/", (req, res) => res.json({ message: "Welcome to test back API!" }));

// routes
app.use(rootApi, api);

// error handler
app.use(notFoundHandle);
app.use(logErrors);
app.use(errorHandle);

// port
const PORT = process.env.PORT || 8003;

// server start
app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});

export default app;
