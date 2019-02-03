import {
    DIRECTION_FAILED,
    DIRECTION_LOADING,
    DIRECTION_SUCCEEDED
} from "../_actions/types";

export function direction(state ={}, action) {
    switch (action.type) {
        case DIRECTION_SUCCEEDED:
            return action.direction;

        default:
            return state;
    }
}

export function fetchDirectionFailed(state = false, action) {
    switch (action.type) {
        case DIRECTION_FAILED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function fetchDirectionLoading(state = false, action) {
    switch (action.type) {
        case DIRECTION_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}