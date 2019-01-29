import {
  WASHROOMS_FAILED,
  WASHROOMS_LOADING,
  WASHROOMS_SUCCEEDED,
  WASHROOM_DETAIL_FAILED,
  WASHROOM_DETAIL_LOADING,
  WASHROOM_DETAIL_SUCCEEDED
} from "../_actions/types";

export function washrooms(state = [], action) {
    switch (action.type) {
      case WASHROOMS_SUCCEEDED:
        return action.washrooms;

      default:
        return state;
    }
}

export function fetchWashroomsFailed(state = false, action) {
    switch (action.type) {
      case WASHROOMS_FAILED:
        return action.hasErrored;

      default:
        return state;
    }
}

export function fetchWashroomsLoading(state = false, action) {
    switch (action.type) {
      case WASHROOMS_LOADING:
        return action.isLoading;

      default:
        return state;
    }
}

export function washroom(state = null, action) {
    switch (action.type) {
      case WASHROOM_DETAIL_SUCCEEDED:
        return action.response.data;

      default:
        return state;
    }
}

export function fetchWashroomDetailFailed(state = false, action) {
    switch (action.type) {
      case WASHROOM_DETAIL_FAILED:
        return action.hasErrored;

      default:
        return state;
    }
}

export function fetchWashroomDetailLoading(state = false, action) {
    switch (action.type) {
      case WASHROOM_DETAIL_LOADING:
        return action.isLoading;

      default:
        return state;
    }
}