import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Media } from 'react-bootstrap'

const Parcel = ({ trackCode, date, postStatus }) => (
  <div>
    <Media.Body>
      <Media.Heading>
        <Link to={`/parcel_logs/${trackCode}`}>{trackCode}</Link>
      </Media.Heading>
      <div>{date}</div>
    </Media.Body>
    <Media.Right>
      {postStatus}
    </Media.Right>
  </div>
)

Parcel.propTypes = {
  trackCode: PropTypes.string.isRequired,
  postStatus: PropTypes.string.isRequired,
  date: PropTypes.string,
}

export default Parcel
