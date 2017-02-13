/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools';

const sagaMiddleware = createSagaMiddleware()

let middleware = [
  sagaMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
  middleware = [
    ...middleware,
    createLogger(),
  ]
}

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        ...middleware
      ),
      // DevTools.instrument()
    ),
  )

  sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

export default configureStore
