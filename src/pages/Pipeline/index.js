import React, { PureComponent } from 'react';
import { Row, Col, Progress, Button, Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import { getEditorState } from 'redux/selectors/editor';
import * as EditorActions from 'redux/modules/editor';
import Element from 'pages/Pipeline/Element';
import './styles.css';

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
  render() {
    const {
      editor: {
        percent,
        activeElement,
        disabledElements,
        values: { name, active, target, actor, event, template },
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
    } = this.props;

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
            <Button type="primary" icon="save" size="large" disabled>
              Save
            </Button>
          </Col>
        </Row>
        <Row gutter={16} className="row">
          <Col span={6}>
            <Element
              title="Actor"
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
              title="Target"
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
  events: state.events,
  templates: state.templates,
});

const mapDispatchToProps = dispatch => ({
  updateName: name => dispatch(EditorActions.updateName(name)),
  updateStatus: active => dispatch(EditorActions.updateStatus(active)),
  selectTarget: targetId => dispatch(EditorActions.selectTarget(targetId)),
  selectActor: actorId => dispatch(EditorActions.selectActor(actorId)),
  selectEvent: eventId => dispatch(EditorActions.selectEvent(eventId)),
  selectTemplate: templateId => dispatch(EditorActions.selectTemplate(templateId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pipeline);
