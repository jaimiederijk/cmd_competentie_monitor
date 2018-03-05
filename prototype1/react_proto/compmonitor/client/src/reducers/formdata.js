import {
  CREATEFORM_REQUESTED,
  CREATEFORM,
  UPDATEFORM_REQUESTED,
  UPDATEFORM,
  FETCHFORMS_REQUESTED,
  FETCHFORMS
} from '../actions'

const initialState = {
  forms:[], // !!! change to Hash Tables https://hackernoon.com/redux-patterns-add-edit-remove-objects-in-an-array-6ee70cab2456
  creatingForm: false,
  updatingForm:false,
  retrievingForms:false
}





export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHFORMS_REQUESTED:
      return {
        ...state,
        retrievingForms: true
      }

    case FETCHFORMS:
      return {
        ...state,

        forms: action.forms,
        retrievingForms: false
      }
    case CREATEFORM_REQUESTED:
      return {
        ...state,
        creatingForm: true
      }

    case CREATEFORM:
      return {
        ...state,

        forms: state.forms.concat(action.newForm),
        creatingForm: false
      }

    case UPDATEFORM_REQUESTED:
      return {
        ...state,
        updatingForm: true
      }

    case UPDATEFORM:
      return {
        ...state,
        forms: state.forms.map(
          (form, i) => form.uuid === action.newForm.uuid ? action.newForm
                                                      : form
        ),
        updatingForm: false
      }
    default:
      return state
  }

}
