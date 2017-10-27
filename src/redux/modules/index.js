import { combineReducers } from 'redux';
import editor from 'redux/modules/editor';
import targets from 'redux/modules/targets';
import actors from 'redux/modules/actors';

export default combineReducers({
  editor,
  targets,
  actors,
});
