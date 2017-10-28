import React, { PureComponent } from 'react';
import { Form, Mention, Modal, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import * as TemplateActions from 'redux/modules/templates';
import TemplateForm from 'pages/Pipeline/TemplateModal/TemplateForm';
import PreviewFrame from 'pages/Pipeline/TemplateModal/PreviewFrame';
import api from 'utils/api';
import './styles.css';

class TemplateModal extends PureComponent {
  state = { visible: false, preview: null };

  replacePlaceholders = mention => Mention.toString(mention).replace('@', '');

  getTemplateData = rawData => ({
    ...rawData,
    name: this.replacePlaceholders(rawData.name),
    message: this.replacePlaceholders(rawData.message),
    description: this.replacePlaceholders(rawData.description),
    caption: rawData.link,
  });

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
      if (err) return;

      this.props.addTemplate(this.getTemplateData(values));
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
      if (err) return;

      api
        .post('/templates/preview', this.getTemplateData(values))
        .then(({ data }) => this.setState({ preview: { __html: data.html } }));
    });
  }, 1000);

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
              <PreviewFrame preview={preview} />
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
