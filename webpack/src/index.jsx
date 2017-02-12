import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App, ParcelsList, ParcelLogsList } from './containers/'
// import Parcel from './components/Parcel'
// import ParcelLog from './components/ParcelLog'
import configureStore from './store'

const store = configureStore()
// const history = syncHistoryWithStore(browserHistory, store)

const renderRoot = () => {
  const routes = [{
    path: '/',
    component: App,
    indexRoute: {
      component: ParcelsList,
      // entityComponent: Parcel,
    },
    childRoutes: [
      // { path: 'show/:id', component: Show },
      {
        path: 'parcel_logs/:trackCode',
        component: ParcelLogsList,
        // entityComponent: ParcelLog,
      },
    ],
  }]

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    </AppContainer>,
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
