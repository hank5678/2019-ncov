import { createStore, combineReducers, compose } from "redux"
import epidemic from "../reducer/epidemic"
import overall from "../reducer/overall"
import loading from "../reducer/loading"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Store = createStore(combineReducers({ epidemic, overall, loading }), composeEnhancers())
export default Store
