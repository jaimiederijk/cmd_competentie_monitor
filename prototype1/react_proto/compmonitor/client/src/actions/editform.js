export const CHANGE_EDIT_CURRENT_SUBJECT = 'editformstate/CHANGE_EDIT_CURRENT_SUBJECT'
export const CHANGE_EDIT_SUBJECT = 'editformstate/CHANGE_EDIT_SUBJECT'

export const changeEditSubject = (newSubject) => {
  return dispatch => {
    dispatch({
      type: CHANGE_EDIT_SUBJECT,
      newSubject: newSubject
    })

  }
}

export const changeEditCurrentSubject = (newSubject) => {
  return dispatch => {
    dispatch({
      type: CHANGE_EDIT_CURRENT_SUBJECT,
      newSubject: newSubject
    })

  }
}
