import axios from 'axios'
// constantes
let initialData = {
    fetching:false,
    array:[],
    current:{}
}
let URL = "https://rickandmortyapi.com/api/character"

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

// reducer
export default function reducer(state=initialData, action){
    switch(action.type){
        case GET_CHARACTERS:
            return {...state, fetching: true}
        case GET_CHARACTERS_ERROR:
            return {...state, fetching:false, error: action.payload}
        case GET_CHARACTERS_SUCCESS:
            return {...state, array: action.payload, fetching: false }
        default:
            return state
    }
}

//actions (thunks)

export let getCharactersAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_CHARACTERS
    })
    return axios.get(URL)
        .then(res => {
            dispatch({
                type:GET_CHARACTERS_SUCCESS,
                payload: res.data.results
            })
        })
    .catch(err=>{
        dispatch({
            type:GET_CHARACTERS_ERROR,
            payload:err.responde.message
        })
    })
}

