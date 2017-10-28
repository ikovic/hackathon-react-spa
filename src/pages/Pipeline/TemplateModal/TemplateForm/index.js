import React from 'react';
import { Form, Input, Mention } from 'antd';

const FormItem = Form.Item;

const TemplateForm = ({ form: { getFieldDecorator }, onSubmit, actor }) => (
  <Form onSubmit={onSubmit}>
    <FormItem label="Name">
      {getFieldDecorator('name', {
        initialValue: Mention.toContentState('Heineken | #ChampionTheMatch with {actor}'),
      })(<Mention style={{ width: '100%', height: 40 }} suggestions={[actor.name]} multiLines />)}
    </FormItem>
    <FormItem label="Link">
      {getFieldDecorator('link', { initialValue: 'https://www.heineken.com' })(<Input />)}
    </FormItem>
    <FormItem label="Image URL">
      {getFieldDecorator('picture', {
        initialValue:
          'https://scontent.xx.fbcdn.net/v/t45.1600-4/22886733_6080390450050_2787285113400983552_n.png?oh=ca809ff33ea1ca7055257405c9f9694c&oe=5A6938E3',
      })(<Input />)}
    </FormItem>
    <FormItem label="Description">
      {getFieldDecorator('description', {
        initialValue: Mention.toContentState(
          'Heineken® launches new UEFA Champions League campaign, starring {actor}',
        ),
      })(<Mention style={{ width: '100%', height: 40 }} suggestions={[actor.name]} multiLines />)}
    </FormItem>
    <FormItem label="Message">
      {getFieldDecorator('message', {
        initialValue: Mention.toContentState(
          '{minutes} minutes into the game, {actor} scores! {club} leads {score}. #ChampionTheMatch and share this post to celebrate with us!',
        ),
      })(<Mention style={{ width: '100%', height: 100 }} suggestions={[actor.name]} multiLines />)}
    </FormItem>
  </Form>
);

export default Form.create({
  onFieldsChange: props => props.preview(),
})(TemplateForm);
