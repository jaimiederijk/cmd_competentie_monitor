import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  createForm//,
  //deleteForm
} from '../../actions'

const uuidv4 = require('uuid/v4');

const Forms = props => {
  const createForm = () => {
    const id = uuidv4()
    props.createForm(id)
    props.changePage(id)
  }
  return (
    <div>
      <h1>Forms</h1>
      {
        props.forms.map((form, index) => {
          console.log(index)
          return <p key={index}><button onClick={() => props.changePage(form.uuid)}>{form.name}</button></p>
        })
      }



      <p><button onClick={createForm}>New form</button></p>
    </div>
  )
}


const mapStateToProps = state=> ({
  forms: state.formData.forms,
  creatingForm: state.formData.creatingForm//,
  //deletingForm: state.formdata.deletingForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createForm,
  changePage: (id) => push('/editform/'+ id + '/name')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms)
