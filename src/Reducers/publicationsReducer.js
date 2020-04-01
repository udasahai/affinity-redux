import {
    FETCH_PUBLICATIONS_BEGIN,
    FETCH_PUBLICATIONS_SUCCESS,
    FETCH_PUBLICATIONS_FAILURE
}
from '../Actions/publicationsActions'


let initial_state_publication = {
    loaded: false,
    error: null,
    publications: [{
        "title": "",
        "microsoftpaperId": 0,
        "source": " [{u'U': u'https://link.springer.com/content/pdf/10.1007%2F978-3-642-28914-9_30.pdf'}]",
        "authors": " [{u'AfN': u'university of california los angeles', u'AuN': u'chongwon cho'}]",
        "fieldsofStudy": " [{u'FN': u'commitment scheme'}] ",
        "abstractKeywords": "[]",
        "paperDisplay": "",
        "datePaper": "",
        "journal": " ",
        "conference": "",
        "userID": 0
    }]
}




export function publicationsReducer(state = initial_state_publication, action) {

    // console.log(action)
    switch (action.type) {
        case FETCH_PUBLICATIONS_BEGIN:
            return state;

        case FETCH_PUBLICATIONS_SUCCESS:
            return {
                ...state,
                loaded: true,
                publications: action.payload.publications
            }
        case FETCH_PUBLICATIONS_FAILURE:
            return {
                ...state,
                loaded: true,
                error: action.payload.error
            }

        default:
            return state;
    }
}
