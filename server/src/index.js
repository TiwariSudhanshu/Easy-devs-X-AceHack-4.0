import { app } from "./app.js";
import dbConnection from "./db/db.config.js";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});