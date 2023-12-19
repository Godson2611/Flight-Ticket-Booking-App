/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRoutes from "./src/routes/router.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", AppRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to My Awesome Flight Booking Server! 🌐");
});

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
