import { NextFunction, Response, Request } from "express"
import { HttpException } from "../../types/http-exception"

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.status >= 400 && err.status <= 499) {
    return res.status(err.status).json({
      status: err.status,
      message: err?.message || "Internal server error",
      error: err,
    })
  }
  return res.status(err.status).json({
    status: err.status,
    message: err?.message || "Internal server error",
  })
}
