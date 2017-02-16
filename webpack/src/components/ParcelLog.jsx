import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Media, Button } from 'react-bootstrap'

import { submitParcelLogForm } from '../actions'
import { getLinkPrefix } from '../routes'
import { getStatusNameByCode } from './Parcel'


const makeHandleOnClickDelete = (msg, deleteCb) => () => {
  confirm(`Delete parcel "${msg}"?`) && deleteCb()
}

const urlForEdit = (isEditorMode, trackCode, id) =>
  `${getLinkPrefix(isEditorMode)}/parcels/${trackCode}/parcel_logs/${id}/?action=edit`

const ParcelLog = ({ msg, postStatus, date, deleteParcelLog, isEditorMode, trackCode, id }) => (
  <div>
    <Media.Body>
      <Media.Heading>{msg}</Media.Heading>
      {
        isEditorMode ?
          <Link to={urlForEdit(isEditorMode, trackCode, id)}>Edit</Link>
        : ''
      }
      <span className="date">{date}</span>
    </Media.Body>
    <Media.Right>
      { isEditorMode ?
        <Button onClick={makeHandleOnClickDelete(msg, deleteParcelLog)} className="close">
          <span>×</span>
        </Button> : ''
      }
      <b className={`nobr post-status post-status__${postStatus}`}>{getStatusNameByCode(postStatus)}</b>
    </Media.Right>
  </div>
)

ParcelLog.propTypes = {
  postStatus: PropTypes.string.isRequired,
  deleteParcelLog: PropTypes.func.isRequired,
  isEditorMode: PropTypes.bool,
  msg: PropTypes.string,
  date: PropTypes.string,
  trackCode: PropTypes.string,
  id: PropTypes.number,
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteParcelLog: bindActionCreators(submitParcelLogForm('DELETE',
    {
      id: ownProps.id,
      trackCode: ownProps.trackCode,
    }), dispatch),
})


export default connect(null, mapDispatchToProps)(ParcelLog)
