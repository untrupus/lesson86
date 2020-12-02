import {
    ADD_ARTIST_ERROR,
    ADD_ALBUM_ERROR,
    ADD_TRACK_ERROR,
    DELETE_ARTIST_ERROR,
    DELETE_ALBUM_ERROR,
    DELETE_TRACK_ERROR
} from "../actionTypes";

const initialState = {
    addArtistError: null,
    addAlbumError: null,
    addTrackError: null,
    deleteArtistError: null,
    deleteAlbumError: null,
    deleteTrackError: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTIST_ERROR:
            return {...state, addArtistError: action.error};
        case ADD_ALBUM_ERROR:
            return {...state, addAlbumError: action.error};
        case ADD_TRACK_ERROR:
            return {...state, addTrackError: action.error};
        case DELETE_ARTIST_ERROR:
            return {...state, deleteArtistError: action.error};
        case DELETE_ALBUM_ERROR:
            return {...state, deleteAlbumError: action.error};
        case DELETE_TRACK_ERROR:
            return {...state, deleteTrackError: action.error};
        default:
            return state;
    }
};

export default adminReducer;