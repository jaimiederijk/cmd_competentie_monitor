import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

const FormInfo = (props) => {
//debugger
  if (props.retrievingForms || !props.form) {

    return <p>loading</p>
  } else {
    return <div>
        <h2>{props.form.name}</h2>
        <div>
        {props.form.subjects.map((t, index) => {
          return <h3 key={index}>{t.subject} </h3>
        })}
        </div>
      </div>

  }
}

class Preview extends Component {
  componentDidMount() {

      //this.props.formsFetchData()
  }

  render() {
    return (
      <div className="preview">
        <h2>Preview</h2>
        <div>
          <FormInfo form={this.props.form} retrievingForms={this.props.retrievingForms}/>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state, ownProp) => {
  return {
    form: state.formData.forms.find(x => x.uuid === ownProp.id),
    retrievingForms: state.formData.retrievingForms

  }

}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
