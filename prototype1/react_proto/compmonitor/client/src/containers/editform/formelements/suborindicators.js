import React from 'react'
import { Field, reduxForm } from 'redux-form'

const FormSubOrIndicators = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Indicators or subsubjects ?</label>
        <div>
          <label>
            <Field name="suborindicators" component="input" type="radio" value="indicators"/>
            indicators
          </label>
          <label>
            <Field name="suborindicators" component="input" type="radio" value="subsubjects"/>
            subsubjects
          </label>
        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>

      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formsuborindicators'  // a unique identifier for this form<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
})(FormSubOrIndicators)
