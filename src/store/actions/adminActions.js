import {
    DELETE_ALBUM_ERROR,
    DELETE_ARTIST_ERROR,
    DELETE_TRACK_ERROR,
    PUBLIC_ALBUM_ERROR,
    PUBLIC_ARTIST_ERROR,
    PUBLIC_TRACK_ERROR
} from "../actionTypes";
import axiosAPI from "../../axiosAPI";
import {push} from "connected-react-router";

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