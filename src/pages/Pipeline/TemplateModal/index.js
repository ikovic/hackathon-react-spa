import React, { PureComponent } from 'react';
import { Modal, Button, Row, Col } from 'antd';

class TemplateModal extends PureComponent {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New...
        </Button>
        <Modal
          title="New Template"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={12}>FORMA</Col>
            <Col span={12}>PREVIEW</Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default TemplateModal;
