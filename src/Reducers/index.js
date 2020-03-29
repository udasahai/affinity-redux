import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer.js'

const initialState = {
    mood: ""
}


const reducer = (state = initialState, action) => {

    //console.log(action)
    //console.log(state)

    switch (action.type) {
        case "REACTION":
            return {
                ...state,
                mood: action.payload
            }

        default:
            return state
    }

}


export const rootReducer = combineReducers({
    joke: reducer,
    users: usersReducer
})
