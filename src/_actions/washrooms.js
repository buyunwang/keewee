import {
    WASHROOMS_FAILED,
    WASHROOMS_LOADING,
    WASHROOMS_SUCCEEDED,
    WASHROOM_DETAIL_FAILED,
    WASHROOM_DETAIL_LOADING,
    WASHROOM_DETAIL_SUCCEEDED
} from "./types";
import { updateAlert } from "./errors";

export function fetchWashroomsFailed(bool) {
  return {
      type: WASHROOMS_FAILED,
      hasErrored: bool
  };
}

export function fetchWashroomsLoading(bool) {
  return {
      type: WASHROOMS_LOADING,
      isLoading: bool
  };
}

export function fetchWashroomsSucceeded(washrooms) {
  return {
      type: WASHROOMS_SUCCEEDED,
      washrooms
  };
}

export function fetchErrorAfterFiveSeconds() {
  return dispatch => {
    setTimeout(() => {
        dispatch(fetchWashroomsLoading(false));
        dispatch(updateAlert("Network failed"));
        dispatch(fetchWashroomsFailed(true));
    }, 5000);
  };
}


export function fetchWashrooms() {
  return dispatch => {
      dispatch(fetchWashroomsLoading(true));
      fetch("http://localhost:3000/washrooms")
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(fetchWashroomsLoading(false));
          return response;
        })
        .then(response => response.json())
        .then(washrooms => dispatch(fetchWashroomsSucceeded(washrooms)))
        .catch(() => dispatch(fetchWashroomsFailed(true)));
  };
}


//TODO addWashroom


// Fetch single washroom
export function fetchWashroomDetailFailed(bool) {
    return {
        type: WASHROOM_DETAIL_FAILED,
        hasErrored: bool
    };
}

export function fetchWashroomDetailLoading(bool) {
    return {
        type: WASHROOM_DETAIL_LOADING,
        isLoading: bool
    };
}

export function fetchWashroomDetailSucceeded(response) {
    return {
        type: WASHROOM_DETAIL_SUCCEEDED,
        response
    };
}

export function fetchDetailErrorAfterFiveSeconds() {
    return dispatch => {
        setTimeout(() => {
            dispatch(fetchWashroomDetailLoading(false));
            dispatch(updateAlert("Network failed"));
            dispatch(fetchWashroomDetailFailed(true));
        }, 5000);
    };
}