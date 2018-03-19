import {
  CHANGE_EDIT_CURRENT_SUBJECT,
  CHANGE_EDIT_SUBJECT
} from '../actions/editform'

const initialState = {
  editSubject:"name",
  editCurrentSubject:"",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EDIT_CURRENT_SUBJECT:
      return {
        ...state,
        editCurrentSubject: action.newSubject
      }

    case CHANGE_EDIT_SUBJECT:
      return {
        ...state,

        editSubject: action.newSubject

      }

    default:
      return state
  }

}
