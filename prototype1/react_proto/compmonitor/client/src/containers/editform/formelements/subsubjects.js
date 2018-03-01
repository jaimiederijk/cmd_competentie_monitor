import React from 'react'
import { Field, reduxForm } from 'redux-form'

const FormSubjects = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Your forms subject or subjects</label>
        <div>
          <Field name="subject" component="input" type="text" placeholder="Competenties"/>
        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formsubjects'  // a unique identifier for this form
})(FormSubjects)
