import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const FieldForm = (props) => {
  const { placeholder, type, input, meta, children } = props

  return (
    <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null}>
      <ControlLabel>{children}</ControlLabel>
      <FormControl
        type={type}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
      />
      {/* <FormControl.Feedback />*/}
    </FormGroup>
  )
}

FieldForm.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.node,
}

export default FieldForm
