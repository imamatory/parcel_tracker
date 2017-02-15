import React, { PropTypes } from 'react'
import { Media } from 'react-bootstrap'

import { getStatusNameByCode } from './Parcel'

const ParcelLog = ({ msg, postStatus, date }) => (
  <div>
    <Media.Body>
      <Media.Heading>{msg}</Media.Heading>
      <div>{date}</div>
    </Media.Body>
    <Media.Right>
      <b className="nobr">{getStatusNameByCode(postStatus)}</b>
    </Media.Right>
  </div>
)

ParcelLog.propTypes = {
  postStatus: PropTypes.string.isRequired,
  msg: PropTypes.string,
  date: PropTypes.string,
}

export default ParcelLog
