import React, { PureComponent } from 'react';
import { Card, Row, Col, Progress, Button, Switch } from 'antd';

class Pipeline extends PureComponent {
  render() {
    return (
      <section>
        <Row gutter={16}>
          <Col span={12}>
            <Progress percent={30} />
          </Col>
          <Col span={12}>
            <Switch checkedChildren="Active" unCheckedChildren="Paused" />
            <Button type="primary" icon="save" size="large" disabled>
              Save
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
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
