import * as express from 'express'

export default () => {
  const app = express()
  app.use((req: any, res, next) => {
    req.userToken = "token"
    next()
  })
  app.get("/posts", (req: any, res) => {
    console.log(req.userToken)
    res.send("Hello World")
  })

  return app
}
