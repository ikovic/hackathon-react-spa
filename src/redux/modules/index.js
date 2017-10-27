import { combineReducers } from 'redux';
import editor from 'redux/modules/editor';
import targets from 'redux/modules/targets';

export default combineReducers({
  editor,
  targets,
});
