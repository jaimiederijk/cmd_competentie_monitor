import React from 'react'
import { push } from 'react-router-redux'
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormName from './formelements/name'
import FormSubjects from './formelements/subjects'
import {
  updateForm
} from '../../actions'

const EditForm = props => {

  const submit = values => {
    values.id = props.id
    props.updateForm(values)
    console.log(values)
  }
  // const formElements = [
  //   <FormName onSubmit={updateForm} />,
  //   <FormSubjects onSubmit={submit} />
  // ]
  //console.log(props.forms)//<h2>{props.forms[0].formName}</h2>//
  return (
    <div>
      <h1>Form editor</h1>
      <h2>{props.form.name}</h2>

      <Route path="/editform/:id/name" render={() => (
        <FormName onSubmit={submit} />
      )} />
      <Route path="/editform/:id/subject" render={() => (
        <FormSubjects onSubmit={submit} />
      )} />



    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  form: state.formData.forms.find(x => x.uuid === ownProps.match.params.id),
  //creatingForm: state.formData.creatingForm,
  //submit: state.formData
  //deletingForm: state.formdata.deletingForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateForm
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)
