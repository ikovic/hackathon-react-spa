import React, { PureComponent } from 'react';
import { Form, Input, Mention, Modal, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import * as TemplateActions from 'redux/modules/templates';
import api from 'utils/api';
import './styles.css';

const FormItem = Form.Item;

const TemplateForm = Form.create({
  onFieldsChange: props => props.preview(),
})(({ form: { getFieldDecorator }, onSubmit, actor }) => (
  <Form onSubmit={onSubmit}>
    <FormItem label="Name">
      {getFieldDecorator('name', { initialValue: 'Test' })(<Input />)}
    </FormItem>
    <FormItem label="Link">
      {getFieldDecorator('link', { initialValue: 'http://somelink.com' })(<Input />)}
    </FormItem>
    <FormItem label="Image URL">
      {getFieldDecorator('picture', {
        initialValue: 'http://cleantechnica.com/files/2009/07/cow.jpg',
      })(<Input />)}
    </FormItem>
    <FormItem label="Caption">
      {getFieldDecorator('caption', { initialValue: 'A picture of a Cow' })(<Input />)}
    </FormItem>
    <FormItem label="Message">
      {getFieldDecorator('message', { initialValue: 'Message for the masses' })(<Input />)}
    </FormItem>
    <FormItem label="Description">
      {getFieldDecorator('description', {
        initialValue: Mention.toContentState('Descriptive text'),
      })(<Mention style={{ width: '100%', height: 100 }} suggestions={[actor.name]} multiLines />)}
    </FormItem>
  </Form>
));

class TemplateModal extends PureComponent {
  state = { visible: false, preview: null };

  showModal = () => {
    if (this.form) {
      this.form.resetFields();
    }
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

  preview = debounce(() => {
    const form = this.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const template = {
        ...values,
        description: Mention.toString(values.description).replace('@', ''),
      };

      api
        .post('/templates/preview', template)
        .then(({ data }) => this.setState({ preview: { __html: data.html } }));
    });
  }, 750);

  render() {
    const { visible, preview } = this.state;
    const actor = this.props.actor;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          <span className="newTemplateBtn">New...</span>
        </Button>
        <Modal
          width={880}
          title="New Template"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={16}>
            <Col span={9}>
              <TemplateForm
                onSubmit={this.handleOk}
                preview={this.preview}
                actor={actor}
                ref={form => (this.form = form)}
              />
            </Col>
            <Col span={15}>
              {preview ? <div className="iframeWrapper" dangerouslySetInnerHTML={preview} /> : null}
            </Col>
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
