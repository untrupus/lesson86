import {
    FETCH_ARTISTS_ERROR,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTIST_ERROR,
    FETCH_ARTIST_SUCCESS,
    FETCH_TRACKS_ERROR,
    FETCH_TRACKS_SUCCESS
} from "./actionTypes";

import axiosAPI from "../axiosAPI";


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
            dispatch(fetchArtistSuccess(response.data));
        } catch (e) {
            dispatch(fetchArtistError(e));
        }
    };
};

export const fetchTracks = (id) => {
    return async dispatch => {
        try {
            const response = await axiosAPI.get("tracks?album=" + id);
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchTracksError(e));
        }
    };
};
