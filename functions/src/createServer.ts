import * as express from 'express'
import * as admin from 'firebase-admin'

const db = admin.firestore()
const auth = admin.auth()

export default () => {
  const app = express()
  app.use(async (req: any, res, next) => {
    const token = req.headers.authorization
    try {
      const { uid, email } = await auth.verifyIdToken(token)
      const snap = await db.collection('users').doc(uid).get()
      const user = snap.data()
      Object.assign(req, {
        user: {
          ...user,
          uid,
          email,
        }
      })
      next()
    } catch (e) {
      res.status(403).send("Error en la autorización")
    }
  })
  app.get("/posts", (req: any, res) => {
    console.log(req.userToken)
    res.send("Hello World")
  })

  return app
}
