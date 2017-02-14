import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Media, Modal } from 'react-bootstrap'

import { getIsEditorMode } from '../store/selectors'


class ListActions extends React.Component {
  static propTypes = {
    updateListFn: PropTypes.func.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
    isEditorMode: PropTypes.bool.isRequired,
  }

  render() {
    const { updateListFn, buttons, isEditorMode } = this.props
    return (
      <Media className={'media__buttons_row'}>
        <Media.Body>
          <Button onClick={updateListFn}>Update</Button>
        </Media.Body>
        { isEditorMode === true && buttons.length ?
          <Media.Right>
            {
              buttons.map((button, idx) =>
                <Link className="btn btn-default" to={button.url} key={idx}>
                  {button.title}
                </Link>
              )
            }
          </Media.Right> : ''
        }
      </Media>
    )
  }
}

const mapStateToProps = state => ({
  isEditorMode: getIsEditorMode(state),
})

export default connect(mapStateToProps)(ListActions)
