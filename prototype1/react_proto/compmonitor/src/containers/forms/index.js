import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  createForm//,
  //deleteForm
} from '../../modules/formdata'

const Forms = props => (
  <div>
    <h1>Forms</h1>
    {
      props.forms.map((form) => { return <p key={form}><button onClick={() => props.changePage()}>{form.name}</button></p>})
    }



    <p><button onClick={() => props.changePage()}>New form</button></p>
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
)(Forms)
