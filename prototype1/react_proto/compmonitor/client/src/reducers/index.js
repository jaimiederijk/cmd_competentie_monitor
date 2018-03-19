import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import formData from './formdata'
import editFormState from './editformstate'

export default combineReducers({
  routing: routerReducer,
  formData,
  editFormState,
  form: formReducer
})
