import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderIndicators = ({ fields, meta: { error, submitFailed } }) => (
  <ul>

    {fields.map((indicator, index) => (
      <li key={index}>
        <button
          className = "remove"
          type="button"
          title="Remove Subject"
          label="remove"
          onClick={() => fields.remove(index)}
        >remove</button>
        <Field
          name={`${indicator}.indicator`}
          type="textarea"
          component={renderField}
          label={"What is your #" + (index + 1) + " indicator ?" }
        />

      </li>
    ))}
    <li>
      <button className="addtofield" type="button" onClick={() => fields.push({})}>
        Add indicator
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
)

const FormIndicators = (props) => {

  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>indicators of {props.subject}</label>
        <div>
          <FieldArray name="indicators" component={renderIndicators} />

        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>

      </div>
    </form>
  )
}

export default reduxForm({
  form: 'formindicators'  // a unique identifier for this form
})(FormIndicators)
