import React from 'react'
import { push } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import FormName from './formelements/name'
import FormSubjects from './formelements/subjects'
import FormSubsubjects from './formelements/subsubjects'
import Preview from '../preview/preview'
import {
  updateForm
} from '../../actions'



const EditForm = props => {

  const orderOfMainQuestions = [
    "name",
    "subjects",
  ]
  let mainIndex = 0

  const submit = values => {

    mainIndex = orderOfMainQuestions.indexOf(Object.keys(values)[0])
    values.form = props.form
    props.updateForm(values)
    console.log(values)
    mainIndex++
    props.changePage(props.id, orderOfMainQuestions[mainIndex])
  }

  const orderOfSubjectQuestions = [
    "subjects",
    "subsubjects",
    "level",
    "indicators",
    "questions",
    "newsubject"
  ]

  let subjectIndex = 0

  const submitOnSubject = values => {
    subjectIndex = orderOfSubjectQuestions.indexOf(Object.keys(values)[0])
    subjectIndex++
    values.form = props.form
    props.updateForm(values)
    console.log(values)

    props.changePageSubject(props.id, values.subjects[0].subject ,orderOfSubjectQuestions[subjectIndex])
  }
  const placeholder = () => {
    if (props.retrievingForms || !props.form) {

      return <p>loading</p>
    } else {
      return props.form.name
    }
  }
  // const formElements = [
  //   <FormName onSubmit={updateForm} />,
  //   <FormSubjects onSubmit={submit} />
  // ]
  //console.log(props.forms)//<h2>{props.forms[0].formName}</h2>//
  return (
    <div >
      <div className="editform">

        <h2>Form editor</h2>

        <a className="back" href="/">back</a>
        <Route path="/forms/editform/:id/name" render={() => (
          <FormName onSubmit={submit} placeholder={placeholder()} />
        )} />
        <Route path="/forms/editform/:id/subjects" render={() => (
          <FormSubjects onSubmit={submitOnSubject} />
        )} />
        <Route path="/forms/editform/:id/:subject/subsubjects" render={(location) => {
          return (
          <FormSubsubjects onSubmit={submit} subject={location.match.params.subject}/>
        )}} />

      </div>
      <Preview
        id={props.id}
        formdata={props.form}
        updatingForm={props.updatingForm}
        location={props.location}/>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.match.params.id,
    location: ownProps.location.pathname,
    retrievingForms: state.formData.retrievingForms,
    form: state.formData.forms.find(x => x.uuid === ownProps.match.params.id),
    updatingForm: state.formData.updatingForm,
  }
  //submit: state.formData
  //deletingForm: state.formdata.deletingForm
}

const mapDispatchToProps = dispatch => {
  return {
    updateForm: (values) => dispatch(updateForm(values)),
    changePage: (id,formelement) => dispatch(push('/forms/editform/'+ id + '/' + formelement)),
    changePageSubject: (id,subject,formelement) => dispatch(push('/forms/editform/'+ id + '/' + subject + "/" + formelement))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)
