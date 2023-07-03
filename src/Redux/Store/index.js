import { composeWithDevTools } from '@redux-devtools/extension'
import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
const middlewares = [thunk]

import rootReducer from '../Reducer/index'

// if (__DEV__) {
//     const createDebugger = require('redux-flipper').default;
//     middlewares.push(createDebugger());
// }

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
        //todo: other store enhancers if any
    )
)

export default store