import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


export const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.text = 'Поле обязательно для заполнения!'
  }
  return errors
}

const parcelsForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" >Название товара</label>
        <div>
          <Field
            name="name" component="input" type="text" placeholder="Название товара"
          />
        </div>
      </div>
      <div>
        <label htmlFor="price" >Цена</label>
        <div>
          <Field
            name="price" component="input" type="text" placeholder="Цена"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      initialValues: ownProps.getData,
    }
  }
)(
  reduxForm({
    form: 'parcels',
    validate,
  }
)(parcelsForm))
