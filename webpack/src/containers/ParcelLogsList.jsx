import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ParcelLog from '../components/ParcelLog'
import EntityList from '../components/EntityList'
import { loadParcelLogs, submitParcelLogForm } from '../actions'
import { ListActions, Edit, ParcelLogForm } from '../containers'
import { getCurrentParcelLog, getIsFetching,
         getIsEditorMode, getParcelLogById } from '../store/selectors'
import { getLinkPrefix } from '../routes'


class ParcelLogsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isEditorMode: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    trackCode: PropTypes.string,
    routeAction: PropTypes.string,
    currentParcelLog: PropTypes.object,
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)

    if (props.routeAction === 'edit') {
      props.fetchItems(props.params)
    } else {
      props.fetchItems({
        trackCode: props.trackCode,
      })
    }
  }

  makeEditComponent = (router, trackCode, parcelLog) => {
    const method = parcelLog ? 'PATCH' : 'POST'
    const identity = this.props.params
    console.log(identity);

    return (
      <Edit
        onSubmitAction={submitParcelLogForm(method, identity)}
        item={parcelLog}
        formComponent={ParcelLogForm}
        router={router}
      />
    )
  }

  render() {
    const { items, fetchItems, isFetching, trackCode,
       routeAction, isEditorMode, router, currentParcelLog } = this.props

    return (
      <div>
        <h1>{'Parcel log for: '}<i>{trackCode}</i></h1>
        <Link to={`${getLinkPrefix(isEditorMode)}/parcels`} >Back to list</Link>
        <br />
        { isFetching ? 'Records are loading...' : '' }
        <ListActions
          updateListFn={() => fetchItems({ id: trackCode })}
          buttons={[
            {
              url: `/manage/parcels/${trackCode}/parcel_logs/?action=new`,
              title: 'Create parcel note',
            },
          ]}
        />
        { items.length ?
          <EntityList items={items} itemComponent={ParcelLog} isEditorMode={isEditorMode} />
          : 'No notes'
        }
        {
          isEditorMode && routeAction === 'new' ?
            this.makeEditComponent(router, trackCode)
            : ''
        }
        {
          isEditorMode && routeAction === 'edit' ?
            this.makeEditComponent(router, null, currentParcelLog)
            : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isFetching: getIsFetching(state),
  items: getCurrentParcelLog(state),
  isEditorMode: getIsEditorMode(state),
  currentParcelLog: getParcelLogById(props.params.id)(state),
  trackCode: props.routeParams.trackCode,
  routeAction: props.location.query.action,
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcelLogs, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(ParcelLogsList)
