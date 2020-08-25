import { Dispatch, AnyAction } from "redux";
import { IServices } from "../services";

export interface ILogin {
  email: string
  password: string
}

const SET_PROFILE_IMAGE = 'users/set-profile-image'

export const setProfileImage = (payload: string) => ({
  payload,
  type: SET_PROFILE_IMAGE,
})

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case SET_PROFILE_IMAGE: {
      return {
        ...state,
        profileImage: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const login = ({ email, password }: ILogin) =>
  async (dispatch: Dispatch, getState: () => any, { auth }: IServices) =>
    await auth.signInWithEmailAndPassword(email, password)

export const register = ({ email, password }: ILogin) =>
  async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password)
    const { user } = userCredential
    const id = user ? user.uid : undefined
    const doc = db.collection('users').doc(id)
    await doc.set({ role: 'user' })
  }

export const loadUserInitialData = () =>
  async (dispatch: Dispatch, getState: () => any, { auth, storage }: IServices) => {
    console.log("OK")
  }