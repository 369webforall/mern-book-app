import express, { json } from "express";
import cors from "cors";

import bookRouter from "./routes/bookRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// app.use(cors()); // cross platform communication is allowed default way
// 2.allow custom origin
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

console.log(PORT);
console.log(DATABASE_URL);

app.use(
  cors({
    origin: ["https://mern-book-frontend-olive.vercel.app/"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json()); // to format json data
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send({ success: "Backend is sucsess" });
});
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Mongo db connected");
    app.listen(PORT, (req, res) => {
      console.log("Server is running in port", PORT);
    });
  })
  .catch((error) => console.log(error));
