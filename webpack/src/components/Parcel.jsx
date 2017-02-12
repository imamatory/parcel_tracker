import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Parcel = ({ trackCode, updatedAt }) => (
  <div>
    <Link to={`/parcel_logs/${trackCode}`}>
      <b>{trackCode}</b>
    </Link>
    <div>{updatedAt}</div>
  </div>
)

Parcel.propTypes = {
  trackCode: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
}

export default Parcel
