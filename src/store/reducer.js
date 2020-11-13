import {
    FETCH_ARTISTS_ERROR,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTIST_SUCCESS,
    FETCH_ARTIST_ERROR,
    FETCH_TRACKS_ERROR,
    FETCH_TRACKS_SUCCESS
} from "./actionTypes";

const initialState = {
    artists: [],
    albums: [],
    tracks: [],
    artist: '',
    album: '',
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {...state, artists: action.value, albums: [], artist: '', album: ''};
        case FETCH_ARTISTS_ERROR:
            return {...state, error: action.error};
        case FETCH_ARTIST_SUCCESS:
            return {...state, albums: action.value, artist: action.value[0].artist.name, tracks: []};
        case FETCH_ARTIST_ERROR:
            return {...state, error: action.error};
        case FETCH_TRACKS_SUCCESS:
            console.log(action.value);
            return {
                ...state,
                tracks: action.value,
                artist: action.value[0].album.artist.name,
                album: action.value[0].album.name
            };
        case FETCH_TRACKS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;