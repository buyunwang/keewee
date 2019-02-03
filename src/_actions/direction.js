import {
  DIRECTION_FAILED,
  DIRECTION_LOADING,
  DIRECTION_SUCCEEDED,
} from "./types";

export function fetchDirectionFailed(bool) {
    return {
        type: DIRECTION_FAILED,
        hasErrored: bool
    };
}

export function fetchDirectionLoading(bool) {
    return {
        type: DIRECTION_LOADING,
        isLoading: bool
    };
}

export function fetchDirectionSucceeded(direction) {
    return { type: DIRECTION_SUCCEEDED, direction };
}

export function fetchErrorAfterFiveSeconds() {
    return dispatch => {
        setTimeout(() => {
            dispatch(fetchDirectionLoading(false));
            dispatch(updateAlert("Network failed"));
            dispatch(fetchDirectionFailed(true));
        }, 5000);
    };
}

export function fetchDirection(coords) {
    return dispatch => {
        url = 'https://api.mapbox.com/directions/v5/mapbox/walking/'+coords+
        '?geometries=geojson&access_token='+"pk.eyJ1IjoiYnJpYW53YW5nIiwiYSI6ImNqZ3N3OGp1ejA0OHIyd214Nmt1djZweHEifQ.VNLH_D4ApSCcygeEJ813DQ";
        dispatch(fetchDirectionLoading(true));
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchDirectionLoading(false));
                return response;
            })
            .then(response => response.json())
            .then(direction => dispatch(fetchDirectionSucceeded(direction)))
            .catch(() => dispatch(fetchDirectionFailed(true)));
    };
}