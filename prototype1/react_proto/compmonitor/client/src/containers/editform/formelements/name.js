import React from 'react'
import { Field, reduxForm } from 'redux-form'

const FormName = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Form name ?</label>
        <div>
          <Field name="name" component="input" type="text" placeholder={props.placeholder}/>
        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>

      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formname'  // a unique identifier for this form<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
})(FormName)
