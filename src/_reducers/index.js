import { combineReducers } from "redux";
import {
  washrooms,
  fetchWashroomsFailed,
  fetchWashroomsLoading,
//   washroom,
//   fetchWashroomDetailFailed,
//   fetchWashroomDetailLoading
} from "./washrooms";
import {
  direction,
  fetchDirectionFailed,
  fetchDirectionLoading
} from "./direction";

export default combineReducers({
    washrooms,
    fetchWashroomsFailed,
    fetchWashroomsLoading,
    direction,
    fetchDirectionFailed,
    fetchDirectionLoading
    // washroom,
    // fetchWashroomDetailFailed,
    // fetchWashroomDetailLoading
});