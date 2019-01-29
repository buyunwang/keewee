import { combineReducers } from "redux";
import {
  washrooms,
  fetchWashroomsFailed,
  fetchWashroomsLoading,
//   washroom,
//   fetchWashroomDetailFailed,
//   fetchWashroomDetailLoading
} from "./washrooms";

export default combineReducers({
    washrooms,
    fetchWashroomsFailed,
    fetchWashroomsLoading,
    // washroom,
    // fetchWashroomDetailFailed,
    // fetchWashroomDetailLoading
});