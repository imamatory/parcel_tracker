import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Media } from 'react-bootstrap'

import { linkPrefix } from '../routes'
import { POST_STATUSES } from '../constants/'

export const getStatusNameByCode = (code) => {
  const status = POST_STATUSES.find(({ value }) => (value === code))
  return status && status.name ? status.name : ''
}

const Parcel = ({ trackCode, date, postStatus, isEditorMode }) => (
  <div>
    <Media.Body>
      <Media.Heading>
        <Link to={`${linkPrefix(isEditorMode)}/parcel_logs/${trackCode}`}>{trackCode}</Link>
      </Media.Heading>
      <div>{date}</div>
    </Media.Body>
    <Media.Right>
      <b className="nobr">{getStatusNameByCode(postStatus)}</b>
    </Media.Right>
  </div>
)

Parcel.propTypes = {
  trackCode: PropTypes.string.isRequired,
  postStatus: PropTypes.string.isRequired,
  isEditorMode: PropTypes.bool,
  date: PropTypes.string,
}

export default Parcel
