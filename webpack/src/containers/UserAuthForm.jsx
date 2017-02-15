import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'

import FieldForm from '../components/FieldForm'
import { submitUserData } from '../actions'


const ParcelLogForm = (props) => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="phone" component={FieldForm} type="text">
        {'Phone'}
      </Field>
      <Field name="trackCode" component={FieldForm} type="text">
        {'Track code'}
      </Field>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </form>
  )
}

ParcelLogForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default connect(
  null,
  dispatch => ({
    onSubmit: bindActionCreators(submitUserData, dispatch),
  })
)(
  reduxForm({
    form: 'userData',
  }
)(ParcelLogForm))