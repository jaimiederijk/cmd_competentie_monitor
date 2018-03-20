import React from 'react'
import { connect } from 'react-redux'
 
const Preview = (props) => {
  const whatEdit = (editsubject,subject) => {
    if (props.editSubject == editsubject && props.editCurrentSubject === subject) {
      return "editing"
    }
    // if (props.location.includes("subsubjects") && editsubject =="subjects") {//
    //   return ""
    // } else if (editsubject =="subsubjects" && props.location.includes(editsubject) && !props.location.includes(subject) ) {
    //   return ""
    // } else if (props.location.includes(editsubject)) {
    //
    // }
  }
  const IndicatorsList = (props) => {
    debugger
    const indicators = props.indicators ? props.indicators : []
    const list = indicators.map((indicators,index) =>
      <p key={index}>{indicators.indicator}</p>
    )
    return (
      <div>{list}</div>
    )
  }

  const FormInfo = () => {
debugger
    if (props.updatingForm || props.retrievingForms || !props.form) {

      return <p>loading</p>
    } else {
      return <div>
          <h2 className={whatEdit("name","")}>{props.form.name}</h2>
          <div className={whatEdit("subjects","")}>

          {props.form.subjects ? (
            props.form.subjects.map((t, index) => {
              //debugger
              return <div key={index}>
                  <h3>{t.subject} </h3>
                  <div className={whatEdit("suborindicators",t.subject)}>
                    <div className={whatEdit("subsubjects",t.subject)}>

                    </div>
                    <div className={whatEdit("indicators",t.subject)}>
                      <IndicatorsList indicators={t.indicators}/>
                    </div>
                  </div>
                </div>
            })
          ) : (
            <p></p>
          )}
          </div>
        </div>

    }
  }

  return (

    <div className="preview">
      <h2>Preview</h2>
      <div>
        {props.editSubject}
        {FormInfo()}

      </div>
    </div>
  )

}
 
const mapStateToProps = (state, ownProps) => {
  return {
    editSubject:state.editFormState.editSubject,
    retrievingForms: state.formData.retrievingForms,
    editCurrentSubject: state.editFormState.editCurrentSubject,
    updatingForm:state.formData.updatingForm,
    form: state.formData.forms.find(x => x.uuid === ownProps.id),
  }
}


 
export default connect(
  mapStateToProps
)(Preview)
