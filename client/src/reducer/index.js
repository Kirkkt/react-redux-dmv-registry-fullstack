import {combineReducers} from "redux"

import people from "./people"
import cars from "./cars"
import registry from "./registry"

export default combineReducers({
  people,
  cars,
  registry,
});