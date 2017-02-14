import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'

import FieldForm from '../components/FieldForm'


export const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.text = "Field couldn't be empty!"
  }
  return errors
}

const ParcelForm = (props) => {
  const { handleSubmit, onSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="track_code" component={FieldForm} type="text" placeholder={"Parcel's track code"}>
        {"Parcel's track code"}
      </Field>
      <Field name="phone" component={FieldForm} type="text" placeholder="Source address">
        Phone
      </Field>
      <Field name="src_addr" component={FieldForm} type="text" placeholder="Source address">
        Source address
      </Field>
      <Field name="dest_addr" component={FieldForm} type="text" placeholder="Destination address">
        Destination address
      </Field>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </form>
  )
}

ParcelForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default connect(
  (state, ownProps) => ({
    // initialValues: ownProps.getData,
  }),
  (dispatch, ownProps) => ({
    onSubmit: bindActionCreators(ownProps.onSubmitAction, dispatch),
  })
)(
  reduxForm({
    form: 'parcel',
    validate,
  }
)(ParcelForm))
