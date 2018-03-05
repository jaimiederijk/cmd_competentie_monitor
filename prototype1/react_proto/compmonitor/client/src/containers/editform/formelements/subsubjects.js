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

    {fields.map((subsubject, index) => (
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
          name={`${subsubject}.subject`}
          type="text"
          component={renderField}
          label={"What is your #" + (index + 1) + " subsubject" }
        />

      </li>
    ))}
    <li>
      <button className="addtofield" type="button" onClick={() => fields.push({})}>
        Add subsubject
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
)

const Subsubjects = (props) => {

  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>subsubjects of {props.subject}</label>
        <div>
          <FieldArray name="subsubjects" component={renderSubjects} />

        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>

      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formsubsubjects'  // a unique identifier for this form
})(Subsubjects)
