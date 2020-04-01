import { combineReducers } from 'redux'
import { usersReducer, departmentReducer, dataReducer, loginReducer } from './usersReducer.js'
import { publicationsReducer } from './publicationsReducer'

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
    users: usersReducer,
    departments: departmentReducer,
    loaded: dataReducer,
    login: loginReducer,
    publications: publicationsReducer
})
