import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Media, Button } from 'react-bootstrap'

import { submitParcelForm } from '../actions'
import { getLinkPrefix } from '../routes'
import { POST_STATUSES } from '../constants/'

export const getStatusNameByCode = (code) => {
  const status = POST_STATUSES.find(({ value }) => (value === code))
  return status && status.name ? status.name : ''
}

const makeHandleOnClickDelete = (trackCode, deleteCb) => () => {
  confirm(`Delete parcel ${trackCode}?`) && deleteCb()
}

const urlForEdit = (isEditorMode, trackCode) =>
  `${getLinkPrefix(isEditorMode)}/parcels/${trackCode}/?action=edit`

const urlForLog = (isEditorMode, trackCode) =>
  `${getLinkPrefix(isEditorMode)}/parcels/${trackCode}/parcel_logs`

const Parcel = ({ trackCode, phone, date, postStatus, isEditorMode, deleteParcel }) => (
  <div className={postStatus === 'received' ? 'muted' : ''}>
    <Media.Body>
      <Media.Heading>
        <Link to={urlForLog(isEditorMode, trackCode)}>{trackCode}</Link>
      </Media.Heading>
      <div>{`Phone: ${phone}`}</div>
      <div>
        { isEditorMode ?
          <Link className="media__link" to={urlForEdit(isEditorMode, trackCode)}>Edit</Link>
          : ''
        }
        <span className="date">{date}</span>
      </div>
    </Media.Body>
    <Media.Right>
      { isEditorMode ?
        <Button onClick={makeHandleOnClickDelete(trackCode, deleteParcel)} className="close">
          <span>×</span>
        </Button> : ''
      }
      <b className={`nobr post-status post-status__${postStatus}`}>{getStatusNameByCode(postStatus)}</b>
    </Media.Right>
  </div>
)

Parcel.propTypes = {
  trackCode: PropTypes.string.isRequired,
  postStatus: PropTypes.string.isRequired,
  deleteParcel: PropTypes.func.isRequired,
  phone: PropTypes.number,
  isEditorMode: PropTypes.bool,
  date: PropTypes.string,
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteParcel: bindActionCreators(submitParcelForm('DELETE', { trackCode: ownProps.trackCode }), dispatch),
})

export default connect(null, mapDispatchToProps)(Parcel)
