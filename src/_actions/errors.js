import {
    UPDATE_ALERT,
} from './types';

export function updateAlert(message) {
    return {
        type: UPDATE_ALERT,
        message
    };
}