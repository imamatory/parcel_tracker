import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadparcels } from '../actions'
import { submitparcels } from '../middleware/api'
import { getparcels } from '../store/selectors'
import parcelsForm from '../components/ParcelsForm'


class Edit extends React.Component {
  static propTypes = {
    routeParams: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    fetchItem: PropTypes.func,
    getItem: PropTypes.object,
  }

  constructor(props) {
    super(props)
    props.fetchItem(this.props.routeParams.id)
  }

  render() {
    const item = this.props.getItem
    return (
      <div>
        <Link to="/">Back</Link>
        { !item ?
          <p>Not found</p> :
            <div>
              <div>ID: {item.id}</div>
              <parcelsForm
                getData={this.props.getItem}
                onSubmit={submitparcels}
              />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  getItem: getparcels(state)[ownProps.routeParams.id],
})

const mapDispatchToProps = dispatch => ({
  fetchItem: bindActionCreators(loadparcels, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
