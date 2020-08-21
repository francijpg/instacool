import * as express from 'express'

export default () => {
  const app = express()
  app.get("/posts", (req, res) => {
    res.send("Hello World")
  })

  return app
}
