export const CREATEFORM_REQUESTED = 'formdata/CREATEFORM_REQUESTED'
export const CREATEFORM = 'formdata/CREATEFORM'

const initialState = {
  forms:[],
  creatingForm: false//,
  // deletingForm:false
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
        forms: state.forms.concat({name:"fff"}),
        creatingForm: !state.creatingForm
      }

    default:
      return state
  }

}

export const createForm = () => {
  return dispatch => {
    dispatch({
      type: CREATEFORM_REQUESTED
    })

    dispatch({
      type: CREATEFORM
    })

  }
}
