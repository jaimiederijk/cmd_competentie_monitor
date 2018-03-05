import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'
import EditForm from '../editform'
import {
  createForm,
  formsFetchData
} from '../../actions'

const uuidv4 = require('uuid/v4');

const FormList = (props) => {
  if (props.retrievingForms) {
    return <p>loading data</p>
  } else {
    return <div >
        <h2>Forms</h2>{
        props.forms.map((form, index) => {
          return <p key={index}><button onClick={() => props.changePage(form.uuid)}><span>{form.name}</span> <span className="form_date">19-02-2018</span></button></p>
        })}
      </div>;
  }
}


class Forms extends Component {
  componentDidMount() {
      this.props.formsFetchData()
  }

  processForm = () => {
    const id = uuidv4()
    this.props.createForm(id)
    this.props.changePage(id)
  }

  render() {
    return (
      <div className="forms" >
        <Route exact path="/forms" render={() => (
          <div className="forms_list">
            <FormList retrievingForms={this.props.retrievingForms} forms={this.props.forms} changePage={this.props.changePage}/>
            <p><button className="new_form" onClick={this.processForm}>+ New form</button></p>
          </div>
        )} />

        <Route path="/forms/editform/:id" component={EditForm} />



      </div>
    )
  }

}


const mapStateToProps = state=> ({
  forms: state.formData.forms,
  creatingForm: state.formData.creatingForm,
  retrievingForms: state.formData.retrievingForms
  //deletingForm: state.formdata.deletingForm
})

const mapDispatchToProps = dispatch => {
  return {
    createForm: (id) => dispatch(createForm(id)),
    formsFetchData: () => dispatch(formsFetchData()),
    changePage: (id) => dispatch(push('/forms/editform/'+ id + '/name'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms)
