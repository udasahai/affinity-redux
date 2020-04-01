export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_DEPARTMENT_BEGIN = 'FETCH_DEPARTMENT_BEGIN';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';
export const DATA_LOADED = "DATA_LOADED";
export const FETCH_TARGETID_BEGIN = 'FETCH_TARGETID_BEGIN';
export const FETCH_TARGETID_SUCCESS = 'FETCH_TARGETID_SUCCESS';
export const FETCH_TARGETID_FAILURE = 'FETCH_TARGETID_FAILURE';

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

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

export const dataLoaded = () => ({
  type: DATA_LOADED
});

export const fetchTargetIDBegin = () => ({
  type: FETCH_TARGETID_BEGIN
});

export const fetchTargetIDSuccessLoginSuccess = user => ({
  type: FETCH_TARGETID_SUCCESS,
  payload: {
    user: user ,
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







export const fetchData = async(endpoint) => {
  let result = await fetch(endpoint);
  handleErrors(result);
  let data = await result.json();

  // console.log(data);
  // console.log(endpoint)
  // ////console.log("meow")

  // if (data.status !== "ok")
  //   throw Error(data)

  // ////console.log("returning data")
  return data;
}


export function fetchUsers() {

  // ////console.log("At/In Fetch Users");
  return dispatch => {
    dispatch(fetchUsersBegin());
    dispatch(fetchDepartmentBegin());

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
