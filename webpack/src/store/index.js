/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools';

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger(),
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
