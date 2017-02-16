import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Field } from 'redux-form'

const FieldForm = (props) => {
  const { type, input, meta, children, optionList } = props
  const controlProps = {
    [type === 'select' ? 'component' : 'type']: type,
    ...input,
  }

  return (
    <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null}>
      <ControlLabel>{children}</ControlLabel>
      { optionList ?
        <Field {...controlProps} className="form-control">
          <option key={0} value="">{''}</option>
          {optionList.map(({ name, value }, idx) =>
            <option key={idx + 1} value={value}>{name}</option>
          )}
        </Field>
        : <FormControl {...controlProps} />
      }
      { meta.touched && meta.error && <span>{meta.error}</span>}
    </FormGroup>
  )
}

FieldForm.propTypes = {
  // touched: PropTypes.bool,
  // error: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.node,
  optionList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
}

export default FieldForm
