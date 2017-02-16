import { browserHistory } from 'react-router'

import { App, ParcelsList, ParcelLogsList, UserAuthForm } from '../containers/'
import { setEditorMode } from '../actions'
import { getUserData } from '../store/selectors'

const enableEditorMode = (dispatch) => {
  dispatch(setEditorMode())
}

const verifyUserAuth = (store) => {
  const state = store.getState()

  const { phone, trackCode } = getUserData(state)
  if (!phone || !trackCode) {
    browserHistory.push('/')
  }
}

export const routes = store => [{
  path: '/',
  component: App,
  indexRoute: {
    component: UserAuthForm,
  },
  childRoutes: [
    {
      path: 'parcels(/)',
      component: ParcelsList,
      onEnter: () => verifyUserAuth(store),
    },
    {
      path: 'parcels/:trackCode/parcel_logs(/)',
      component: ParcelLogsList,
      onEnter: () => verifyUserAuth(store),
    },
    {
      path: 'manage',
      onEnter: (nextState, replace) => {
        enableEditorMode(store.dispatch)
        if (nextState.location.pathname.match(/^\/manage[/]?$/) !== null) {
          replace('/manage/parcels')
        }
      },
      childRoutes: [
        {
          path: 'parcels(/)(:trackCode)',
          component: ParcelsList,
        },
        {
          path: 'parcels/:trackCode/parcel_logs(/)(:id)',
          component: ParcelLogsList,
        },
      ],
    },
  ],
}]

export const getLinkPrefix = isEditorMode => (isEditorMode === true ? '/manage' : '')
