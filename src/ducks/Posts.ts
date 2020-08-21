import { AnyAction, Dispatch } from "redux"
import { IServices } from "../services"
import { firestore } from 'firebase';

// action types
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'

// action creators
const fetchStart = () => ({
  type: START,
})
const fetchSuccess = (payload: IPost) => ({
  payload,
  type: SUCCESS,
})
const fetchError = (error: Error) => ({
  error,
  type: ERROR,
})

export interface IPost {
  [key: string]: {
    comment: string
    userId: string
    createdAt: firestore.Timestamp
    imageURL: string
  }
}

// reducer initial state
const initialState = {
  data: {},
  fetched: false,
  fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true,
      }
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false,
      }

    case ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
      }
    default:
      return state
  }
}

// create first thunk
export const fetchPosts = () =>
  async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
    dispatch(fetchStart())
    try {
      const snaps = await db.collection('posts').get()
      const posts: any = {}
      snaps.forEach(x => posts[x.id] = x.data())

      const imgIds = await Promise.all(Object.keys(posts).map(async x => {
        const ref = storage.ref(`posts/${x}.jpg`)
        const url = await ref.getDownloadURL()
        return [x, url]
      }))

      const keyedImages: any = {}
      imgIds.forEach(x => keyedImages[x[0]] = x[1])

      Object.keys(posts).forEach(x => posts[x] = {
        ...posts[x],
        imageURL: keyedImages[x],
      })

      dispatch(fetchSuccess(posts))
    } catch (e) {
      dispatch(fetchError(e))
    }
  }

export const like = (id: string) =>
  async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
    if (!auth.currentUser) {
      return
    }
    const token = await auth.currentUser.getIdToken()
    const result = await fetch("/api/posts", {
      headers: {
        authorization: token
      }
    })
    const text = await result.text()
    console.log(text)
  }

export const share = (id: string) =>
  async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
    console.log(id)
  }