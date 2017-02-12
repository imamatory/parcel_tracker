import React from 'react'
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App, ParcelsList, ParcelLogsList } from './containers/'
import configureStore from './store'

const store = configureStore()

const renderRoot = () => {
  const routes = [{
    path: '/',
    component: App,
    indexRoute: {
      component: ParcelsList,
    },
    childRoutes: [
      {
        path: 'parcel_logs/:trackCode',
        component: ParcelLogsList,
      },
    ],
  }]

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'))
}

renderRoot(App)

// if (module.hot) {
//   module.hot.accept('./containers/App', () => {
//     const updatedApp = require('./containers/App') // eslint-disable-line global-require
//
//     renderRoot(updatedApp)
//   })
// }
