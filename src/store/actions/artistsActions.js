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
    DELETE_ARTIST_ERROR,
    DELETE_ALBUM_ERROR,
    DELETE_TRACK_ERROR,
    PUBLIC_ALBUM_ERROR,
    PUBLIC_ARTIST_ERROR,
    PUBLIC_TRACK_ERROR
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

const deleteArtistError = (error) => {
    return {type: DELETE_ARTIST_ERROR, error}
};

const deleteAlbumError = (error) => {
    return {type: DELETE_ALBUM_ERROR, error}
};

const deleteTrackError = (error) => {
    return {type: DELETE_TRACK_ERROR, error}
};

export const deleteArtist = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.delete('/artists/' + id);
            dispatch(push("/"));
        } catch (e) {
            dispatch(deleteArtistError(e));
        }
    };
};

export const deleteAlbum = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.delete('/albums/' + id);
        } catch (e) {
            dispatch(deleteAlbumError(e));
        }
    };
};

export const deleteTrack = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.delete('/tracks/' + id);
        } catch (e) {
            dispatch(deleteTrackError(e));
        }
    };
};

const publicArtistError = (error) => {
    return {type: PUBLIC_ARTIST_ERROR, error}
};

const publicAlbumError = (error) => {
    return {type: PUBLIC_ALBUM_ERROR, error}
};

const publicTrackError = (error) => {
    return {type: PUBLIC_TRACK_ERROR, error}
};

export const publicTrack = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.patch('/tracks/' + id, {published: true});
        } catch (e) {
            dispatch(publicTrackError(e));
        }
    };
};

export const publicAlbum = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.patch('/albums/' + id, {published: true});
        } catch (e) {
            dispatch(publicAlbumError(e));
        }
    };
};

export const publicArtist = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.patch('/artists/' + id, {published: true});
        } catch (e) {
            dispatch(publicArtistError(e));
        }
    };
};