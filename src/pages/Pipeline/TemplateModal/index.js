import React, { PureComponent } from 'react';
import { Form, Input, Modal, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

const TemplateForm = Form.create()(({ form: { getFieldDecorator }, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <FormItem label="Name">{getFieldDecorator('name')(<Input />)}</FormItem>
    <FormItem label="Link">{getFieldDecorator('link')(<Input />)}</FormItem>
    <FormItem label="Message">{getFieldDecorator('message')(<Input />)}</FormItem>
    <FormItem label="Picture">{getFieldDecorator('picture')(<Input />)}</FormItem>
    <FormItem label="Description">
      {getFieldDecorator('description')(<Input type="textarea" />)}
    </FormItem>
  </Form>
));

class TemplateModal extends PureComponent {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
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
            <Col span={12}>
              <TemplateForm onSubmit={this.handleOk} ref={form => (this.form = form)} />
            </Col>
            <Col span={12}>PREVIEW</Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(TemplateModal);
