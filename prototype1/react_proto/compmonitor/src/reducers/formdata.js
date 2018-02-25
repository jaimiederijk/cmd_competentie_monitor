import {
  CREATEFORM_REQUESTED,
  CREATEFORM,
  UPDATEFORM_REQUESTED,
  UPDATEFORM
} from '../actions'

const initialState = {
  forms:[], // !!! change to Hash Tables https://hackernoon.com/redux-patterns-add-edit-remove-objects-in-an-array-6ee70cab2456
  creatingForm: false,
  updatingForm:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATEFORM_REQUESTED:
      return {
        ...state,
        creatingForm: true
      }

    case CREATEFORM:
      return {
        ...state,

        forms: state.forms.concat({uuid:action.uuid,name:"unnamed form"}),
        creatingForm: !state.creatingForm
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
          (form, i) => form.uuid === action.values.id ? {...form, name : action.values.formName}
                                                      : form
        ),
        updatingForm: !state.creatingForm
      }
    default:
      return state
  }

}
