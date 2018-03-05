import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderSubjects = ({ fields, meta: { error, submitFailed } }) => (
  <ul>

    {fields.map((subject, index) => (
      <li key={index}>
        <button
          className = "remove"
          type="button"
          title="Remove Subject"
          label="remove"
          onClick={() => fields.remove(index)}
        >remove</button>
        <h4></h4>
        <Field
          name={`${subject}.subject`}
          type="text"
          component={renderField}
          label={"What is your #" + (index + 1) + " subject" }
        />

      </li>
    ))}
    <li>
      <button className="addtofield" type="button" onClick={() => fields.push({})}>
        Add subject
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
)

const FormSubjects = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>What are your forms subject or subjects</label>
        <div>
          <FieldArray name="subjects" component={renderSubjects} />

        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>

      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formsubjects'  // a unique identifier for this form<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
})(FormSubjects)
