import React from 'react'
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { routes } from './routes/'
import configureStore from './store'

const store = configureStore()

const renderRoot = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes(store)} />
    </Provider>,
    document.getElementById('app'))
}

renderRoot()

// if (module.hot) {
//   module.hot.accept('./containers/App', () => {
//     const updatedApp = require('./containers/App') // eslint-disable-line global-require
//
//     renderRoot(updatedApp)
//   })
// }
