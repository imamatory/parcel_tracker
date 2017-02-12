import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Col } from 'react-bootstrap'

import Parcel from '../components/Parcel'
import EntityList from '../components/EntityList'
import { loadParcels } from '../actions'
import { getParcelsList, getIsFetching } from '../store/selectors'

class ParcelsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.array,
  }

  constructor(props) {
    super(props)
    props.fetchItems()
  }

  render() {
    const { items, fetchItems, isFetching } = this.props
    return (
      <div>
        <h1>Parcel list</h1>
        { isFetching ? 'Records are loading...' : '' }
        <Button onClick={fetchItems}>Обновить</Button>
        <br />
        <EntityList items={items} ItemComponent={Parcel} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  items: getParcelsList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcels, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(ParcelsList)
