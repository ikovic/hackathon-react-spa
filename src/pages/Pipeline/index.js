import React, { PureComponent } from 'react';
import { Card, Row, Col, Progress, Button, Checkbox, Input } from 'antd';
import './styles.css';

const ProgressInfo = ({ percent }) => (
  <span className="progressWrapper">
    <span className="progressLabel">Setup progress:</span>
    <Progress type="circle" width={40} percent={percent} />
  </span>
);

class Pipeline extends PureComponent {
  render() {
    return (
      <section id="pipelineEditor">
        <Row gutter={16} className="row">
          <Col span={12} className="controls">
            <span>
              <Input
                addonBefore="Name"
                placeholder="Pipeline Name"
                className="title"
                size="large"
              />
            </span>
            <Checkbox className="activeCheckbox">Active</Checkbox>
          </Col>
          <Col span={12} className="saveWrapper">
            <ProgressInfo percent={25} />
            <Button type="primary" icon="save" size="large" disabled>
              Save
            </Button>
          </Col>
        </Row>
        <Row gutter={16} className="row">
          <Col span={6}>
            <Card title="Actor">Card content</Card>
          </Col>
          <Col span={6}>
            <Card title="Event">Card content</Card>
          </Col>
          <Col span={6}>
            <Card title="Target">Card content</Card>
          </Col>
          <Col span={6}>
            <Card title="Template">Card content</Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Pipeline;
