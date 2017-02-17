import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, hasSubmitSucceeded } from 'redux-form'
import { Button, Alert } from 'react-bootstrap'

import FieldForm from '../components/FieldForm'


const ParcelForm = (props) => {
  const { handleSubmit, onSubmit, pristine, submitting, submitSucceeded, initialValues } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        submitSucceeded && pristine ?
          <Alert bsStyle="success">{'Saved!'}</Alert>
          : ''
      }
      <Field disabled={!!initialValues} name="trackCode" component={FieldForm} type="text">
        {"Parcel's track code"}
      </Field>
      <Field name="phone" component={FieldForm} type="text">
        {'Phone'}
      </Field>
      <Field name="srcAddr" component={FieldForm} type="text">
        {'Source address'}
      </Field>
      <Field name="destAddr" component={FieldForm} type="text">
        {'Destination address'}
      </Field>
      <div>
        <Button type="submit" disabled={pristine || submitting}>{'Submit'}</Button>
      </div>
    </form>
  )
}

ParcelForm.propTypes = {
  submitSucceeded: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
}


export default connect(
  (state, ownProps) => ({
    initialValues: ownProps.getData,
    submitSucceeded: hasSubmitSucceeded('parcel')(state),
  }),
  (dispatch, ownProps) => ({
    onSubmit: bindActionCreators(ownProps.onSubmitAction, dispatch),
  })
)(reduxForm({ form: 'parcel' })(ParcelForm))
