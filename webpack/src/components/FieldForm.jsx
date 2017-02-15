import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const FieldForm = (props) => {
  const { type, input, meta, children, optionList } = props
  const controlProps = {
    [type === 'select' ? 'componentClass' : 'type']: type,
    ...input,
  }

  return (
    <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null}>
      <ControlLabel>{children}</ControlLabel>
      { optionList ?
        <select {...controlProps} className="form-control">
          {optionList.map(({ name, value }) =>
            <option key={value} value={value}>{name}</option>
          )}
        </select>
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
