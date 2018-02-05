import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  createForm//,
  //deleteForm
} from '../../modules/formdata'

const EditForm = props => (
  <div>
    <h1>Form editor</h1>


    <label>
      Form name:
      <input type="text"/>
    </label>
    <input type="submit" value="Submit" />

    <p><button onClick={props.createForm}>New form</button></p>
  </div>
)

const mapStateToProps = state => ({
  forms: state.formData.forms,
  creatingForm: state.formData.creatingForm//,
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
