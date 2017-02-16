import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'

import FieldForm from '../components/FieldForm'
import { POST_STATUSES } from '../constants/'


export const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.text = "Field couldn't be empty!"
  }
  return errors
}

const ParcelLogForm = (props) => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="msg" component={FieldForm} type="text">
        {'Message'}
      </Field>
      <Field name="post_status" component={FieldForm} type="select" optionList={POST_STATUSES}>
        {'Post status'}
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
  (state, ownProps) => ({
    initialValues: ownProps.getData,
  }),
  (dispatch, ownProps) => ({
    onSubmit: bindActionCreators(ownProps.onSubmitAction, dispatch),
  })
)(
  reduxForm({
    form: 'parcelLog',
    validate,
  }
)(ParcelLogForm))
