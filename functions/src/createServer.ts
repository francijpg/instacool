import * as express from 'express'
import * as admin from 'firebase-admin'

interface IRequest extends express.Request {
  user: {
    uid: string,
    email: string,
    role: string,
  }
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()
db.settings( {timestampsInSnapshots: true} )
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
  app.get("/posts/:postId/like", async (req: IRequest, res: any) => {
    const { uid } = req.user
    const { postId } = req.params
    const snaps = await db.collection('likes')
      .where('userId', '==', uid)
      .where('postId', '==', postId)
      .limit(1)
      .get()
    const result: { id?: string } = {}
    snaps.forEach(x => Object.assign(result, { ...x.data(), id: x.id }))
    if (result.id) {
      await db.collection('likes').doc(result.id).delete()
    }
    if (!result.id) {
      await db.collection('likes').doc().set({
        userId: uid,
        postId,
        createdAt: new Date(),
      })
    }
    res.sendStatus(204)
  })


  return app
}
