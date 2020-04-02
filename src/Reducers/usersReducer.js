import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_DEPARTMENT_BEGIN,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
  FETCH_TARGETID_BEGIN,
  FETCH_TARGETID_SUCCESS,
  FETCH_TARGETID_FAILURE,
  SET_USERS_FILTER,
  FETCH_RESEARCH_BEGIN,
  FETCH_RESEARCH_SUCCESS,
  FETCH_RESEARCH_FAILURE,
  DATA_LOADED,
  CLEAR_FILTER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_USER_UPDATE
}
from '../Actions/userActions';

const initialState_user = {
  items: [],
  loading: true,
  error: null,
  filter: {
    name: '',
    departmentID: 0,
    research: ''
  },
  update: {
    val: [],
    status: '',
    error: null
  }
};

export function dataReducer(state = false, action) {
  if (action.type === DATA_LOADED) {
    return true;
  }
  return state;
}

let initialState_research = {
  items: [],
  loading: true,
  error: null
}

export function researchReducer(state = initialState_research, action) {
  switch (action.type) {
    case FETCH_RESEARCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RESEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.research
      }

    case FETCH_RESEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state;

  }
}

export function usersReducer(state = initialState_user, action) {

  //console.log(action)
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.users,
      };

    case FETCH_USERS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case SET_USERS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filter: { ...initialState_user.filter }
      }


    case UPDATE_USER_BEGIN:
      return state;

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          status: 'ok'
        }
      }

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        user: {
          status: 'fail',
          error: action.payload.error
        }
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}


const initialState_department = {
  items: [{
    departmentID: 0,
    name: 'All'
  }],
  loading: true,
  error: null,
};

export function departmentReducer(state = initialState_department, action) {

  //console.log(action)
  switch (action.type) {
    case FETCH_DEPARTMENT_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_DEPARTMENT_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.departments,
      };

    case FETCH_DEPARTMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}


const initialState_login = {
  user: {
    "userID": 0,
    "email": "",
    "firstName": "",
    "lastName": "",
    "researchInterests": "",
    "profilePicture": "",
    "ShibbolethLogin": ""
  },
  loggedIn: false,
  redirect: false,
  attempted: false
}


export function loginReducer(state = initialState_login, action) {
  // console.log(action)
  switch (action.type) {
    case FETCH_TARGETID_BEGIN:
      return state
    case FETCH_TARGETID_SUCCESS:
      return {
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        redirect: action.payload.redirect,
        attempted: true
      }
    case FETCH_TARGETID_FAILURE:
      return {
        ...state,
        redirect: true,
        attempted: true
      }

    default:
      return state;
  }
}
