/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ADD_RECORD, TOGGLE_STATUS, SET_FILTER } from './actionTypes'

export const addRecord = (text: string) => ({
  type: ADD_RECORD,
  payload: text,
})

export const toggleStatus = (id: number) => ({
  type: TOGGLE_STATUS,
  payload: id,
})

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  payload: filter,
})
