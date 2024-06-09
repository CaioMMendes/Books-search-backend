import { NextFunction, Request, Response } from "express"
import { HttpRequest } from "../http/http-adapter"
import { errorMiddleware } from "../middleware/error-middleware"

const routerAdapter = (controller: any, method: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req?.body,
      headers: req?.headers,
      params: req?.params,
      query: req.query,
    }

    const httpResponse = await controller[method](httpRequest)

    if (httpResponse.status >= 200 && httpResponse <= 299) {
      return res.status(httpResponse.status).json(httpResponse)
    } else {
      return errorMiddleware(httpResponse, req, res, next)
    }
  }
}

export default routerAdapter
