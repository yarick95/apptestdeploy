/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_RECORD, TOGGLE_STATUS, SET_FILTER } from './actionTypes'

interface Record {
  id: number
  text: string
  completed: boolean
}

interface State {
  records: Record[]
  filter: string
}

const initialState: State = {
  records: [],
  filter: 'all',
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          {
            id: state.records.length + 1,
            text: action.payload,
            completed: false,
          },
        ],
      }

    case TOGGLE_STATUS:
      return {
        ...state,
        records: state.records.map((record) =>
          record.id === action.payload
            ? { ...record, completed: !record.completed }
            : record
        ),
      }

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }

    default:
      return state
  }
}

export default reducer
