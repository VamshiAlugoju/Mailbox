import mongoose from "mongoose";

const dbUrl = process.env.DBURL ?? "";

export default async function connectDB() {
  console.log(dbUrl);
  try {
    const connection = await mongoose.connect(dbUrl);

    return Promise.resolve(connection);
  } catch (err) {

    return Promise.reject(err);
  }
}
