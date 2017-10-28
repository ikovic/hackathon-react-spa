import React from 'react';
import { Form, Input, Mention } from 'antd';

const FormItem = Form.Item;

const TemplateForm = ({ form: { getFieldDecorator }, onSubmit, actor }) => (
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
    <FormItem label="Description">
      {getFieldDecorator('description', { initialValue: 'Short description' })(<Input />)}
    </FormItem>
    <FormItem label="Message">
      {getFieldDecorator('message', {
        initialValue: Mention.toContentState('Message with mentions'),
      })(<Mention style={{ width: '100%', height: 100 }} suggestions={[actor.name]} multiLines />)}
    </FormItem>
  </Form>
);

export default Form.create({
  onFieldsChange: props => props.preview(),
})(TemplateForm);
