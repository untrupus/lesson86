import {
    FETCH_ARTISTS_ERROR,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTIST_ERROR,
    FETCH_ARTIST_SUCCESS,
    FETCH_TRACKS_ERROR,
    FETCH_TRACKS_SUCCESS,
    ADD_ALBUM_ERROR,
    ADD_ARTIST_ERROR,
    ADD_TRACK_ERROR,
} from "../actionTypes";
import {push} from "connected-react-router";
import axiosAPI from "../../axiosAPI";


const fetchArtistsSuccess = value => {
    return {type: FETCH_ARTISTS_SUCCESS, value};
};

const fetchArtistsError = error => {
    return {type: FETCH_ARTISTS_ERROR, error};
};

const fetchArtistSuccess = value => {
    return {type: FETCH_ARTIST_SUCCESS, value};
};

const fetchArtistError = error => {
    return {type: FETCH_ARTIST_ERROR, error};
};

const fetchTracksSuccess = value => {
    return {type: FETCH_TRACKS_SUCCESS, value};
};

const fetchTracksError = error => {
    return {type: FETCH_TRACKS_ERROR, error};
};

export const fetchArtists = () => {
    return async dispatch => {
        try {
            const response = await axiosAPI.get("artists");
            dispatch(fetchArtistsSuccess(response.data));
        } catch (e) {
            dispatch(fetchArtistsError(e));
        }
    };
};

export const fetchArtist = (id) => {
    return async dispatch => {
        try {
            const response = await axiosAPI.get("albums?artist=" + id);
            if (response.data.length === 0) {
                dispatch(push('/'));
            } else {
                dispatch(fetchArtistSuccess(response.data));
            }
        } catch (e) {
            dispatch(fetchArtistError(e));
        }
    };
};

export const fetchTracks = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get("tracks?album=" + id);
            if (response.data.length === 0) {
                dispatch(push('/'));
            } else {
                dispatch(fetchTracksSuccess(response.data));
            }
        } catch (e) {
            dispatch(fetchTracksError(e));
        }
    };
};

const addArtistError = error => {
    return {type: ADD_ARTIST_ERROR, error};
};
const addAlbumError = error => {
    return {type: ADD_ALBUM_ERROR, error};
};
const addTrackError = error => {
    return {type: ADD_TRACK_ERROR, error};
};

export const addArtist = (data) => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/artists', data);
            dispatch(addArtistError(null));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addArtistError(e.response.data));
        }
    };
};

export const addAlbum = (data) => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/albums', data);
            dispatch(addAlbumError(null));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addAlbumError(e.response.data));
        }
    };
};

export const addTrack = (data) => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/tracks', data);
            dispatch(addTrackError(null));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addTrackError(e.response.data));
        }
    };
};

