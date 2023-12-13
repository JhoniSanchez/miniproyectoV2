import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.hig5y.mongodb.net/${process.env.DB_NAME}`;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the database.");
})
.catch((error) => {
    console.error("Error connecting to the database:", error);
});