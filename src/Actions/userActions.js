export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

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


const fecthData = async() => {
  let result = await fetch('/user');
  handleErrors(result);
  let data = await result.json();

  // ////console.log(data);
  // ////console.log("meow")

  if (data.status !== "ok")
    throw Error(data)

  // ////console.log("returning data")
  return data;
}


export function fetchUsers() {

  // ////console.log("At/In Fetch Users");
  return dispatch => {
    dispatch(fetchUsersBegin());

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
    fecthData().then(data => dispatch(fetchUsersSuccess(data.rows)))
      .catch(error => dispatch(fetchUsersFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
