import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, hasSubmitSucceeded } from 'redux-form'
import { Button, Alert } from 'react-bootstrap'

import FieldForm from '../components/FieldForm'
import { POST_STATUSES } from '../constants/'


const ParcelLogForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded } = props

  return (
    <form onSubmit={handleSubmit}>
      {
        submitSucceeded && pristine ?
          <Alert bsStyle="success">{'Saved!'}</Alert>
          : ''
      }
      <Field name="msg" component={FieldForm} type="text">
        {'Message'}
      </Field>
      <Field name="postStatus" component={FieldForm} type="select" optionList={POST_STATUSES}>
        {'Post status'}
      </Field>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </form>
  )
}

ParcelLogForm.propTypes = {
  submitSucceeded: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default connect(
  (state, ownProps) => ({
    initialValues: ownProps.getData,
    submitSucceeded: hasSubmitSucceeded('parcelLog')(state),
  }),
  (dispatch, ownProps) => ({
    onSubmit: bindActionCreators(ownProps.onSubmitAction, dispatch),
  })
)(reduxForm({ form: 'parcelLog' })(ParcelLogForm))
