import { handleActions } from 'redux-actions'
import * as actions from '../actions/items'

const itemsReducerDefaultState = []

const items = handleActions({
  [actions.addItem](state, { payload: { item } }) {
    return [...state, item]; 
  },
  [actions.removeItem](state, { payload: { id : removeItemId } }) {
    return state.filter(({ id }) => id !== removeItemId)
  },
  [actions.reset]() {
    return itemsReducerDefaultState
  }
}, itemsReducerDefaultState)

export default items