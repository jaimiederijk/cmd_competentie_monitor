export const CREATEFORM_REQUESTED = 'formdata/CREATEFORM_REQUESTED'
export const CREATEFORM = 'formdata/CREATEFORM'
export const UPDATEFORM_REQUESTED = 'formdata/UPDATEFORM_REQUESTED'
export const UPDATEFORM = 'formdata/UPDATEFORM'
export const FETCHFORMS_REQUESTED = 'formdata/FETCHFORMS_REQUESTED'
export const FETCHFORMS = 'formdata/FETCHFORMS'

export const formsIsLoading = () => {
  return {
    type: 'FETCHFORMS_REQUESTED'
  }
}

export const formsFetchData = () => {

  return dispatch => {
    dispatch({
      type: FETCHFORMS_REQUESTED
    })

    fetch(`/api/getforms`, {
      accept: "application/json"
    })
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((response) => dispatch({
        type: FETCHFORMS,
        forms: response
      })
    )
  }



}

const saveFormData = (form, url) => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
  .then((response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  })
}

export const createForm = (id) => {
  const newForm = {"uuid":id, name:"unnamed form"}

  saveFormData(newForm,'/api/createform')

  return dispatch => {
    dispatch({
      type: CREATEFORM_REQUESTED
    })
    dispatch({
      type: CREATEFORM,
      newForm: newForm
    })

  }
}

export const updateForm = (values) => {

  

  if ("formName" in values) {
    values.form.name = values.name
  } else if ("subjects" in values) {
    values.form.subjects = values.subjects
    // if (!("subjects" in values)) {
    //   values.subjects = []
    // }

    //values.sections.push
  }


  const newForm = values.form

  saveFormData(newForm,'/api/updateform')

  return dispatch => {
    dispatch({
      type: UPDATEFORM_REQUESTED
    })
    dispatch({
      type: UPDATEFORM,
      newForm: newForm
    })

  }
}
