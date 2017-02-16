import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ParcelLog from '../components/ParcelLog'
import EntityList from '../components/EntityList'
import { loadParcelLogs, submitParcelLogForm } from '../actions'
import { ListActions, Edit, ParcelLogForm } from '../containers'
import { getCurrentParcelLog, getIsFetching, getIsEditorMode } from '../store/selectors'
import { getLinkPrefix } from '../routes'


class ParcelLogsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isEditorMode: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    trackCode: PropTypes.string,
    routeAction: PropTypes.string,
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    props.fetchItems({ id: this.props.trackCode })
  }

  render() {
    const { items, fetchItems, isFetching, trackCode,
       routeAction, isEditorMode, router } = this.props
    return (
      <div>
        <h1>{'Parcel log for '}<i>{trackCode}</i></h1>
        <Link to={`${getLinkPrefix(isEditorMode)}/parcels`} >Back to list</Link>
        <br />
        { isFetching ? 'Records are loading...' : '' }
        <ListActions
          updateListFn={() => fetchItems({ id: trackCode })}
          buttons={[
            {
              url: `/manage/parcel_logs/${trackCode}/?action=new`,
              title: 'Create parcel note',
            },
          ]}
        />
        { items.length ?
          <EntityList items={items} itemComponent={ParcelLog} isEditorMode={isEditorMode} />
          : 'No notes'
        }
        { routeAction === 'new' ?
          <Edit
            onSubmitAction={submitParcelLogForm('POST', { trackCode })}
            formComponent={ParcelLogForm}
            router={router}
          /> : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isFetching: getIsFetching(state),
  items: getCurrentParcelLog(state),
  isEditorMode: getIsEditorMode(state),
  trackCode: props.routeParams.trackCode,
  routeAction: props.location.query.action,
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcelLogs, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(ParcelLogsList)
