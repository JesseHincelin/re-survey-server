import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const initDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, { dbName: "re_survey" });
    console.log("Database connected");
  } catch (e) {
    console.log("oh oh problem : ", e.message);
  }
};

export default initDb;
