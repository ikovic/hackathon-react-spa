import React, { PureComponent } from 'react';
import { Row, Col, Progress, Button, Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEditorState } from 'redux/selectors/editor';
import { getFilteredEvents } from 'redux/selectors/events';
import * as EditorActions from 'redux/modules/editor';
import Element from 'pages/Pipeline/Element';
import './styles.css';
import { getActors } from 'redux/modules/actors';

const PipelineName = ({ value, onChange }) => (
  <span>
    <Input
      addonBefore="Name"
      placeholder="Pipeline Name"
      className="title"
      size="large"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </span>
);

const ProgressInfo = ({ percent }) => (
  <span className="progressWrapper">
    <span className="progressLabel">Setup progress:</span>
    <Progress type="circle" width={40} percent={percent} />
  </span>
);

class Pipeline extends PureComponent {
  componentWillMount() {
    const { getActors, clearEditor } = this.props;

    clearEditor();
    getActors();
  }
  render() {
    const {
      editor: {
        percent,
        activeElement,
        disabledElements,
        values: { name, active, target, actor, event, template, redirect },
      },
      actors,
      events,
      targets,
      templates,
      updateName,
      updateStatus,
      selectTarget,
      selectActor,
      selectEvent,
      selectTemplate,
      savePipeline,
    } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <section id="pipelineEditor">
        <Row gutter={16} className="row">
          <Col span={12} className="controls">
            <PipelineName value={name} onChange={updateName} />
            <Checkbox
              checked={active}
              onChange={e => updateStatus(e.target.checked)}
              className="activeCheckbox"
            >
              Active
            </Checkbox>
          </Col>
          <Col span={12} className="saveWrapper">
            <ProgressInfo percent={percent} />
            <Button
              type="primary"
              icon="save"
              size="large"
              onClick={savePipeline}
              disabled={percent !== 100}
            >
              Save
            </Button>
          </Col>
        </Row>
        <Row gutter={16} className="row">
          <Col span={6}>
            <Element
              loading={actors.loading}
              title="Team or Player"
              placeholder="user"
              items={actors.items}
              onItemClick={selectActor}
              selectedItemId={actor}
              active={activeElement === 'actor'}
              disabled={disabledElements.includes('actor')}
            />
          </Col>
          <Col span={6}>
            <Element
              loading={events.loading}
              title="Event"
              placeholder="trophy"
              items={events.items}
              onItemClick={selectEvent}
              selectedItemId={event}
              active={activeElement === 'event'}
              disabled={disabledElements.includes('event')}
            />
          </Col>
          <Col span={6}>
            <Element
              loading={targets.loading}
              title="Platform"
              placeholder="share-alt"
              items={targets}
              onItemClick={selectTarget}
              selectedItemId={target}
              active={activeElement === 'target'}
              disabled={disabledElements.includes('target')}
            />
          </Col>
          <Col span={6}>
            <Element
              loading={templates.loading}
              title="Template"
              placeholder="file"
              items={templates.items}
              onItemClick={selectTemplate}
              selectedItemId={template}
              active={activeElement === 'template'}
              disabled={disabledElements.includes('template')}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  editor: getEditorState(state),
  targets: state.targets,
  actors: state.actors,
  events: getFilteredEvents(state),
  templates: state.templates,
});

const mapDispatchToProps = dispatch => ({
  updateName: name => dispatch(EditorActions.updateName(name)),
  updateStatus: active => dispatch(EditorActions.updateStatus(active)),
  selectTarget: targetId => dispatch(EditorActions.selectTarget(targetId)),
  selectActor: actorId => dispatch(EditorActions.selectActor(actorId)),
  selectEvent: eventId => dispatch(EditorActions.selectEvent(eventId)),
  selectTemplate: templateId => dispatch(EditorActions.selectTemplate(templateId)),
  savePipeline: () => dispatch(EditorActions.savePipeline()),
  getActors: () => dispatch(getActors()),
  clearEditor: () => dispatch(EditorActions.clearEditor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pipeline);
