export type HttpRequest = {
  body: any
  headers: any
  params: any
  query: any
}

export type HttpResponse = {
  status: number
  message: string
  error?: any
}
