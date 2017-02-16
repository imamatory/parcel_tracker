import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Parcel from '../components/Parcel'
import EntityList from '../components/EntityList'
import { loadParcels, submitParcelForm } from '../actions'
import { ListActions, Edit, ParcelForm } from '../containers'
import { getParcelsList, getIsFetching, getIsEditorMode, getUserData } from '../store/selectors'

class ParcelsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isEditorMode: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    routeAction: PropTypes.string,
    router: PropTypes.object,
    userData: PropTypes.object,
  }

  constructor(props) {
    super(props)
    props.fetchItems({})
  }

  render() {
    const { items, fetchItems, isFetching, routeAction,
      router, isEditorMode, userData } = this.props

    return (
      <div>
        { isFetching ? 'Records are loading...' : '' }
        <h1>{'Parcels list'}</h1>
        {
          userData.phone ?
            <p>{`Parcels for: ${userData.phone}`}</p>
          : ''
        }
        <ListActions
          updateListFn={fetchItems}
          buttons={[
            {
              url: '/manage/parcels/?action=new',
              title: 'Create parcel',
            },
          ]}
        />
        {
          items.length ?
            <EntityList items={items} itemComponent={Parcel} isEditorMode={isEditorMode} />
          : <b>{'No notes found'}</b>
        }
        {
          isEditorMode && routeAction === 'new' ?
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
  userData: getUserData(state),
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcels, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ParcelsList)
