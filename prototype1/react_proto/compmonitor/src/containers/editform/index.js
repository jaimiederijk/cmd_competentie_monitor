import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormName from './formelements/name'
import FormSubjects from './formelements/subjects'
import {
  createForm//,
  //deleteForm
} from '../../modules/formdata'

let formIndex = 0

const EditForm = props => {
  const createForm = values => {
    formIndex ++
    props.createForm(values)
  }
  const submit = values => {

    console.log(values)
  }
  const formElements = [
    <FormName onSubmit={createForm} />,
    <FormSubjects onSubmit={submit} />
  ]
  console.log(props.forms)//<h2>{props.forms[0].formName}</h2>
  return (
    <div>
      <h1>Form editor</h1>

      {formElements[formIndex]}


      <p><button onClick={props.createForm}>New form</button></p>
    </div>
  )
}

const mapStateToProps = state => ({
  forms: state.formData.forms,
  creatingForm: state.formData.creatingForm,
  submit: state.formData
  //deletingForm: state.formdata.deletingForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createForm,
  changePage: () => push('/editform')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)
