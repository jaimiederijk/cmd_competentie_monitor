import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import counter from './counter'
import formData from './formdata'

export default combineReducers({
  routing: routerReducer,
  counter,
  formData,
  form: formReducer
})
