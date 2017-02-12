import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

import ParcelLog from '../components/ParcelLog'
import EntityList from '../components/EntityList'
import { loadParcelLogs } from '../actions'
import { getCurrentParcelLog, getIsFetching } from '../store/selectors'

class ParcelLogsList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.array,
    trackCode: PropTypes.string,
  }

  constructor(props) {
    super(props)
    props.fetchItems(this.props.trackCode)
  }

  render() {
    const { items, fetchItems, isFetching, trackCode } = this.props
    console.log(items)
    return (
      <div>
        <h1>{`Parcel log for ${trackCode}`}</h1>
        <Link to={`/`}>Back</Link>
        <br />
        { isFetching ? 'Records are loading...' : '' }
        <Button onClick={() => fetchItems(trackCode)}>Обновить</Button>
        <EntityList items={items} ItemComponent={ParcelLog} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isFetching: getIsFetching(state),
  items: getCurrentParcelLog(state),
  trackCode: props.routeParams.trackCode,
})

const mapDispatchToProps = dispatch => ({
  fetchItems: bindActionCreators(loadParcelLogs, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(ParcelLogsList)
