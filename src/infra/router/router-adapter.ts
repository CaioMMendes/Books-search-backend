import { NextFunction, Request, Response } from "express"
import { HttpRequest, HttpResponse } from "../http/http-adapter"
import { errorMiddleware } from "../middleware/error-middleware"

const routerAdapter = (controller: any, method: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req?.body,
      headers: req?.headers,
      params: req?.params,
      query: req.query,
    }

    const httpResponse: HttpResponse = await controller[method](httpRequest)
    console.log(httpResponse)

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      return res.status(httpResponse.status).json(httpResponse)
    } else {
      return errorMiddleware(httpResponse?.error, req, res, next)
    }
  }
}

export default routerAdapter
