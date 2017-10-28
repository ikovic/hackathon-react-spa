import React, { PureComponent } from 'react';
import { Form, Input, Mention, Modal, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as TemplateActions from 'redux/modules/templates';
import './styles.css';

const FormItem = Form.Item;

const TemplateForm = Form.create()(({ form: { getFieldDecorator }, onSubmit, actor }) => (
  <Form onSubmit={onSubmit}>
    <FormItem label="Name">{getFieldDecorator('name')(<Input />)}</FormItem>
    <FormItem label="Link">{getFieldDecorator('link')(<Input />)}</FormItem>
    <FormItem label="Caption">{getFieldDecorator('caption')(<Input />)}</FormItem>
    <FormItem label="Message">{getFieldDecorator('message')(<Input />)}</FormItem>
    <FormItem label="Image URL">{getFieldDecorator('picture')(<Input />)}</FormItem>
    <FormItem label="Description">
      {getFieldDecorator('description')(
        <Mention style={{ width: '100%', height: 100 }} suggestions={[actor.name]} multiLines />,
      )}
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

      this.props.addTemplate({
        ...values,
        description: Mention.toString(values.description).replace('@', ''),
      });
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
    const actor = this.props.actor;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          <span className="newTemplateBtn">New...</span>
        </Button>
        <Modal
          title="New Template"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={12}>
              <TemplateForm
                onSubmit={this.handleOk}
                actor={actor}
                ref={form => (this.form = form)}
              />
            </Col>
            <Col span={12}>PREVIEW</Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  actor: state.actors.items.find(actor => state.editor.actor === actor.id),
});

const mapDispatchToProps = dispatch => ({
  addTemplate: template => dispatch(TemplateActions.addTemplate(template)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TemplateModal));
