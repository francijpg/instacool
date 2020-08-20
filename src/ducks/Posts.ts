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
  async (dispatch: Dispatch, getState: () => any, { db }: IServices) => {
    dispatch(fetchStart())
    try {
      const snaps = await db.collection('posts').get()
      const posts: any = {}
      snaps.forEach(x => posts[x.id] = x.data())
      dispatch(fetchSuccess(posts))
    } catch (e) {
      dispatch(fetchError(e))
    }
  }
