/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers'

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
    ),
  )

  sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)

  return store
}

export default configureStore
