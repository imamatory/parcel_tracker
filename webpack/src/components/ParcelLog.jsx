import React, { PropTypes } from 'react'

const ParcelLog = ({ postStatus, updatedAt }) => (
  <div>
    <b>{postStatus}</b>
    <div>{updatedAt}</div>
  </div>
)

ParcelLog.propTypes = {
  postStatus: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
}

export default ParcelLog
