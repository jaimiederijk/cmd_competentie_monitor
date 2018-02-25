export const CREATEFORM_REQUESTED = 'formdata/CREATEFORM_REQUESTED'
export const CREATEFORM = 'formdata/CREATEFORM'
export const UPDATEFORM_REQUESTED = 'formdata/UPDATEFORM_REQUESTED'
export const UPDATEFORM = 'formdata/UPDATEFORM'

export const createForm = (id) => {
  return dispatch => {
    dispatch({
      type: CREATEFORM_REQUESTED
    })
    dispatch({
      type: CREATEFORM,
      uuid: id
    })
  }
}
export const updateForm = (values) => {


  return dispatch => {
    dispatch({
      type: UPDATEFORM_REQUESTED
    })
    dispatch({
      type: UPDATEFORM,
      values: values
    })

  }
}
