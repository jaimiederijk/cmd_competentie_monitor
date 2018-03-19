import React from 'react'

 
const Preview = (props) => {
  const whatEdit = (editsubject,subject) => {
    if (props.location.includes("subsubjects") && editsubject =="subjects") {//
      return ""
    } else if (editsubject =="subsubjects" && props.location.includes(editsubject) && !props.location.includes(subject) ) {
      return ""
    } else if (props.location.includes(editsubject)) {
      return "editing"
    }
  }
  const IndicatorsList = (props) => {
    const indicators = props.indicators ? props.indicators : []
    const list = indicators.map((indicators,index) =>
      <p key={index}>{indicators.indicator}</p>
    )
    return (
      <div>{list}</div>
    )
  }

  const FormInfo = () => {
//debugger
    if (props.updatingForm || props.retrievingForms || !props.formdata) {

      return <p>loading</p>
    } else {
      return <div>
          <h2 className={whatEdit("name")}>{props.formdata.name}</h2>
          <div className={whatEdit("subjects")}>

          {props.formdata.subjects ? (
            props.formdata.subjects.map((t, index) => {
              //debugger
              return <div key={index}>
                  <h3>{t.subject} </h3>
                  <div className={whatEdit("subsubjects",t.subject)}>

                  </div>
                  <div className={whatEdit("indicators",t.subject)}>
                    <IndicatorsList indicators={t.indicators}/>
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
        {FormInfo()}

      </div>
    </div>
  )

}
 

 
export default Preview
