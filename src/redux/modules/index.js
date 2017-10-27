import { combineReducers } from 'redux';
import editor from 'redux/modules/editor';
import targets from 'redux/modules/targets';
import actors from 'redux/modules/actors';
import events from 'redux/modules/events';
import templates from 'redux/modules/templates';
import pipelines from 'redux/modules/pipelines';

export default combineReducers({
  editor,
  targets,
  actors,
  events,
  templates,
  pipelines,
});
