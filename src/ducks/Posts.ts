import { AnyAction } from "redux"

// action types
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'

// action creators
const fetchStart = () => ({
  type: START,
})
const fetchSuccess = (payload: any) => ({
  payload,
  type: SUCCESS,
})
const fetchError = (error: Error) => ({
  error,
  type: ERROR,
})

// reducer initial state
const initialState = {
  data: {},
  fetched: false,
  fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
  return state
}
