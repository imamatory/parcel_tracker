import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Parcel from '../components/Parcel'
import EntityList from '../components/EntityList'
import { loadParcels, submitParcelForm } from '../actions'
import { ListActions, Edit, ParcelForm } from '../containers'
import { getParcelsList, getIsFetching, getIsEditorMode } from '../store/selectors'

class ParcelsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    routeAction: PropTypes.string,
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    props.fetchItems()
  }

  render() {
    const { items, fetchItems, isFetching, routeAction, router, isEditorMode } = this.props

    return (
      <div>
        <h1>{"Parcel's list"}</h1>
        { isFetching ? 'Records are loading...' : '' }
        <ListActions
          updateListFn={fetchItems}
          buttons={[
            {
              url: '/manage/parcels/?action=new',
              title: 'Create parcel',
            },
          ]}
        />
        <EntityList items={items} itemComponent={Parcel} isEditorMode={isEditorMode} />
        { isEditorMode && routeAction === 'new' ?
          <Edit onSubmitAction={submitParcelForm()} formComponent={ParcelForm} router={router} />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isFetching: getIsFetching(state),
  items: getParcelsList(state),
  routeAction: props.location.query.action,
  isEditorMode: getIsEditorMode(state),
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcels, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ParcelsList)
