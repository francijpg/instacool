import { AnyAction, Dispatch } from "redux"
import { IServices } from "../services"
import { firestore } from 'firebase';
import * as utils from '../utils';
import { IState } from ".";

// interfaces
export interface IPost {
  comment: string
  userId: string
  createdAt: firestore.Timestamp
  imageURL: string
}

export interface IDataPosts {
  [key: string]: IPost
}

export interface IUploadPost {
  file: File
  comment: string
}

// action types
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add'
const UPLOAD_START = 'posts/upload-start'
const UPLOAD_SUCCESS = 'posts/upload-success'

// action creators
const fetchStart = () => ({
  type: START,
})
const fetchSuccess = (payload: IDataPosts) => ({
  payload,
  type: SUCCESS,
})
const fetchError = (error: Error) => ({
  error,
  type: ERROR,
})
const add = (payload: IDataPosts) => ({
  payload,
  type: ADD,
})
const uploadStart = () => ({
  type: UPLOAD_START
})

const uploadSuccess = (payload: IDataPosts) => ({
  payload,
  type: UPLOAD_SUCCESS,
})

// reducer initial state
const initialState = {
  data: {},
  fetched: false,
  fetching: false,
  uploaded: false,
  uploading: false,
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
    case UPLOAD_START:
      return {
        ...state,
        uploading: true
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        uploaded: true,
        uploading: false,
      }
    default:
      return state
  }
}

// create first thunk
export const fetchPosts = () =>
  async (dispatch: Dispatch, getState: () => IState, { db, storage }: IServices) => {
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
  async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
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
  async (dispatch: Dispatch, getState: () => IState, { auth, db, storage }: IServices) => {
    if (!auth.currentUser) {
      return
    }
    const token = await auth.currentUser.getIdToken()
    const result = await fetch(`/api/posts/${id}/share`, {
      headers: {
        authorization: token
      }
    })
    //Get document using firestore
    const { id: postId }: { id: string } = await result.json()
    const snap = await db.collection('posts').doc(postId).get()

    //Get image using storage
    const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL()
    const blob: any = await utils.download(url)
    const ref = storage.ref(`posts/${postId}.jpg`)
    await ref.put(blob)
    const imageURL = await ref.getDownloadURL()

    //Upload image again (from client)
    dispatch(add({
      [snap.id]: {
        ...snap.data(),
        imageURL,
      }
    } as IDataPosts))
  }

export const uploadPost = (payload: IUploadPost) =>
  async (dispatch: Dispatch, getState: () => IState, { auth, storage, db }: IServices) => {
    if (!auth.currentUser || !payload.file || !payload.comment) {
      return
    }
    dispatch(uploadStart())
    const token = await auth.currentUser.getIdToken()
    const result = await fetch(`/api/posts/upload`, {
      body: JSON.stringify({ comment: payload.comment }),
      headers: {
        authorization: token
      },
      method: 'POST'
    })

    const { id: postId }: { id: string } = await result.json()
    const storageRef = storage.ref()
    const response = await storageRef
      .child(`posts`)
      .child(`${postId}.jpg`)
      .put(payload.file)
    const imageUrl = await response.ref.getDownloadURL()
    const snap = await db.collection('posts').doc(postId).get()
    dispatch(uploadSuccess({
        [snap.id]: {
          ...snap.data(),
          imageUrl,
        }
      } as unknown as IDataPosts))

  }
