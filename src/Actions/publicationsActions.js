import { fetchData } from './userActions'

export const FETCH_PUBLICATIONS_BEGIN = 'FETCH_PUBLICATIONS_BEGIN';
export const FETCH_PUBLICATIONS_SUCCESS = 'FETCH_PUBLICATIONS_SUCCESS';
export const FETCH_PUBLICATIONS_FAILURE = 'FETCH_PUBLICATIONS_FAILURE';


export const fetchPublicationsBegin = () => ({
    type: FETCH_PUBLICATIONS_BEGIN
});

export const fetchPublicationsSuccess = publications => ({
    type: FETCH_PUBLICATIONS_SUCCESS,
    payload: { publications }
});

export const fetchPublicationsFailure = error => ({
    type: FETCH_PUBLICATIONS_FAILURE,
    payload: { error }
});


export function fetchPublications(userID) {

    // console.log("HERE")
    return dispatch => {
        dispatch(fetchPublicationsBegin());
        fetchData('/publications/user?userid=' + userID)
            .then(data => dispatch(fetchPublicationsSuccess(data.rows)))
            .catch(error => dispatch(fetchPublicationsFailure(error)));
    };
}
