import React from 'react'
import { push } from 'react-router-redux'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

const Preview2 = props => {

  const FormInfo = () => {
  debugger
    if (props.updatingForm || props.retrievingForms || !props.formdata) {

      return <p>loading</p>
    } else {
      return <div>
          <h2>{props.formdata.name}</h2>
          <div>
          {props.form.subjects.map((t, index) => {
            return <h3 key={index}>{t.subject} </h3>
          })}
          </div>
        </div>

    }
  }


  return (
    <div className="preview">
      <h2>Preview</h2>
      <div>
        <p>{props.updatingForm}</p>
        {FormInfo()}
      </div>
    </div>
  )


}


const mapStateToProps = (state, ownProp) => {
  //debugger
  return {
    currentSubject: state.editFormState.editCurrentSubject,
    editSubject: state.editSubject,
    form: state.formData.forms.find(x => x.uuid === ownProp.id),
    retrievingForms: state.formData.retrievingForms,
    updatingForm: state.formData.updatingForm,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview2)
