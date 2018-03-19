import React from 'react'
import { push } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import FormName from './formelements/name'
import FormSubjects from './formelements/subjects'
import FormSubOrIndicators from './formelements/suborindicators'
import FormIndicators from './formelements/indicators'
import FormSubsubjects from './formelements/subsubjects'
import Preview from '../preview/preview'
import {
  updateForm,
  changeEditSubject,
  changeEditCurrentSubject
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
    "suborindicators",
    "indicators",
    "level",
    "questions",
    "newsubject"
  ]

  let subjectIndex = 0

  const submitOnSubject = values => {

    subjectIndex = orderOfSubjectQuestions.indexOf(Object.keys(values)[0])
    subjectIndex++
    const getSubject = () => {
      if (Object.keys(values)[0]==="subjects") {
        return values.subjects[0].subject
      } else {
        return props.form.subjects.filter(t => props.location.includes(t.subject) )[0].subject
      }
    }
    const subject = getSubject()
    values.form = props.form
    values.subject = subject
    props.updateForm(values)
    console.log(values)

    props.changePageSubject(props.id, subject, orderOfSubjectQuestions[subjectIndex])
  }

  // const placeholder = () => {
  //   if (props.retrievingForms || !props.form) {
  //
  //     return <p>loading</p>
  //   } else {
  //     return props.form.name
  //   }
  // }
  const loadData = () => {
    if (props.retrievingForms || !props.form) {

      return <p>loading</p>
    } else {
      return (
        <div>
          <Route path="/forms/editform/:id/name" render={() => {
            props.changeEditSubject("name")
            return (
              <FormName onSubmit={submit} placeholder={props.form.name} />
            )
          }} />

          <Route path="/forms/editform/:id/subjects" render={() => {
            props.changeEditSubject("subjects")
            return (
              <FormSubjects onSubmit={submitOnSubject} subjects={props.form.subjects}/>
            )
          }} />

          <Route path="/forms/editform/:id/:subject/suborindicators" render={(location) => {
            props.changeEditSubject("suborindicators")
            props.changeEditCurrentSubject(location.match.params.subject)
            return (
              <FormSubOrIndicators onSubmit={submitOnSubject}/>
            )
          }} />

          <Route path="/forms/editform/:id/:subject/indicators" render={(location) => {
            props.changeEditSubject("indicators")
            props.changeEditCurrentSubject(location.match.params.subject)
            return (
              <FormIndicators onSubmit={submitOnSubject} subject={location.match.params.subject}/>
            )
          }} />

          <Route path="/forms/editform/:id/:subject/subsubjects" render={(location) => {
            props.changeEditSubject("subsubjects")
            props.changeEditCurrentSubject(location.match.params.subject)
            return (
            <FormSubsubjects onSubmit={submit} subject={location.match.params.subject}/>
          )}} />
        </div>
      )
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
        {loadData()}
        <a className="back" href="/">back</a>


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
    changeEditCurrentSubject: (subj) => dispatch(changeEditCurrentSubject(subj)),
    changeEditSubject: (subj) => dispatch(changeEditSubject(subj)),
    updateForm: (values) => dispatch(updateForm(values)),
    changePage: (id,formelement) => dispatch(push('/forms/editform/'+ id + '/' + formelement)),
    changePageSubject: (id,subject,formelement) => dispatch(push('/forms/editform/'+ id + '/' + subject + "/" + formelement))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)
