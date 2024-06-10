import mongoose from "mongoose"
import { HttpException } from "../../types/http-exception"

export async function connect() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new HttpException(500, "Missing DATABASE_URL")
    }
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Database connected")
  } catch (error) {
    throw new HttpException(
      500,
      "Ocorreu um erro ao tentar conectar com o banco"
    )
  }
}
