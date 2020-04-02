export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const CLEAR_USER_UPDATE = 'CLEAR_USER_UPDATE'

export const SET_USERS_FILTER = 'SET_USERS_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

export const FETCH_DEPARTMENT_BEGIN = 'FETCH_DEPARTMENT_BEGIN';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';

export const DATA_LOADED = "DATA_LOADED";

export const FETCH_TARGETID_BEGIN = 'FETCH_TARGETID_BEGIN';
export const FETCH_TARGETID_SUCCESS = 'FETCH_TARGETID_SUCCESS';
export const FETCH_TARGETID_FAILURE = 'FETCH_TARGETID_FAILURE';


export const FETCH_RESEARCH_BEGIN = 'FETCH_RESEARCH_BEGIN'
export const FETCH_RESEARCH_SUCCESS = 'FETCH_RESEARCH_SUCCESS'
export const FETCH_RESEARCH_FAILURE = 'FETCH_RESEARCH_FAILURE'




export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const updateUserBegin = () => ({
  type: UPDATE_USER_BEGIN
})

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
  payload: { status: 'ok' }
})

export const updateUserFailure = e => ({
  type: UPDATE_USER_FAILURE,
  payload: {
    status: 'fail',
    error: e
  }
})


export const clearUserUpdate = () => ({
  type: CLEAR_USER_UPDATE
})


export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

export const setUsersFilter = filter => ({
  type: SET_USERS_FILTER,
  payload: { filter }
})

export const clearFilter = () => ({
  type: CLEAR_FILTER
})

export const fetchDepartmentBegin = () => ({
  type: FETCH_DEPARTMENT_BEGIN
});

export const fetchDepartmentSuccess = departments => ({
  type: FETCH_DEPARTMENT_SUCCESS,
  payload: { departments }
});

export const fetchDepartmentFailure = error => ({
  type: FETCH_DEPARTMENT_FAILURE,
  payload: { error }
});

export const fetchResearchBegin = () => ({
  type: FETCH_RESEARCH_BEGIN
});

export const fetchResearchSuccess = research => ({
  type: FETCH_RESEARCH_SUCCESS,
  payload: { research }
});

export const fetchResearchFailure = error => ({
  type: FETCH_RESEARCH_FAILURE,
  payload: { error }
});

export const dataLoaded = () => ({
  type: DATA_LOADED
});

export const fetchTargetIDBegin = () => ({
  type: FETCH_TARGETID_BEGIN
});

export const fetchTargetIDSuccessLoginSuccess = user => ({
  type: FETCH_TARGETID_SUCCESS,
  payload: {
    user: user,
    loggedIn: true,
    redirect: true
  }
});

export const fetchTargetIDSuccessLoginFail = () => ({
  type: FETCH_TARGETID_SUCCESS,
  payload: {
    user: {},
    loggedIn: false,
    redirect: true
  }
});


export const fetchTargetIDFailure = error => ({
  type: FETCH_TARGETID_FAILURE,
  payload: { error }
});



export const updateUser = args => {
  return dispatch => {
    dispatch(updateUserBegin());

    postData('/user/update', JSON.stringify(args))
      .then(data => dispatch(updateUserSuccess()))
      .catch(error => dispatch(updateUserFailure(error)))
  }
}

const postData = async(endpoint, body) => {
  let result = await fetch(endpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body
  })
  handleErrors(result);
  let data = await result.json();
  return data;
}





export const fetchData = async(endpoint) => {
  let result = await fetch(endpoint);
  handleErrors(result);
  let data = await result.json();
  return data;
}


export function fetchUsers() {

  // ////console.log("At/In Fetch Users");
  return dispatch => {
    dispatch(fetchUsersBegin());
    dispatch(fetchDepartmentBegin());
    dispatch(fetchResearchBegin());

    // // ////console.log("Desputched")
    // return fetch("/user")
    //   .then(handleErrors)
    //   .then(res => res.json())
    //   .then(json => {

    //     if (json.status !== "ok")
    //       throw Error(json.status)
    //     dispatch(fetchUsersSuccess(json.rows));
    //     return json.rows;
    //   })
    fetchData('/research_interest').then(data => dispatch(fetchResearchSuccess(data.rows)))
      .catch(error => dispatch(fetchResearchFailure(error)));

    fetchData('/user').then(data => dispatch(fetchUsersSuccess(data.rows)))
      .catch(error => dispatch(fetchUsersFailure(error)));

    fetchData('/department').then(data => dispatch(fetchDepartmentSuccess(data.rows)))
      .then(dispatch(dataLoaded()))
      .catch(error => dispatch(fetchDepartmentFailure(error)));
  };
}


const dispatchLogin = (dispatch, rows) => {
  if (rows.length > 0)
    dispatch(fetchTargetIDSuccessLoginSuccess(rows[0]));
  else
    dispatch(fetchTargetIDSuccessLoginFail());
}


export function fetchUserByTargetID() {
  return dispatch => {
    dispatch(fetchTargetIDBegin());

    fetchData('/login')
      .then(datum => {
        // console.log(datum)
        return datum['SHIBEDUPERSONTARGETEDID']
      })
      .then(targetID => fetchData('/user/id?id=' + targetID))
      .then(data => dispatchLogin(dispatch, data.rows))
      .catch(error => dispatch(fetchTargetIDFailure(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
