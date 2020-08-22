import { AnyAction, Dispatch } from "redux"
import { IServices } from "../services"
import { firestore } from 'firebase';

// action types
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add'

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
const add = (payload: IPost) => ({
  payload,
  type: ADD,
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
    case ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        }
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
    await fetch(`/api/posts/${id}/like`, {
      headers: {
        authorization: token
      }
    })
  }

export const share = (id: string) =>
  async (dispatch: Dispatch, getState: () => any, { auth, db,  }: IServices) => {
    if (!auth.currentUser) {
      return
    }
    const token = await auth.currentUser.getIdToken()
    const result = await fetch(`/api/posts/${id}/share`, {
      headers: {
        authorization: token
      }
    })
    const { id: postId }: { id: string } = await result.json()
    const snap = await db.collection('posts').doc(postId).get()
    dispatch(add({
      [snap.id]: {
          ...snap.data()
      }
  } as IPost)) 
  }