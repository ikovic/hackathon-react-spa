import React from 'react';
import { Card } from 'antd';
import cx from 'classnames';
import './styles.css';

const Item = ({ selected, item, onClick }) => (
  <li className={cx('listItem', { selected })}>
    <button onClick={() => onClick(item.id)}>{item.name}</button>
  </li>
);

const Element = ({ selectedItemId, items, title, active, onItemClick }) => (
  <div className={cx('elementCard', { active })}>
    <Card title={title} bodyStyle={{ padding: 0 }}>
      <ul className="pipeList">
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            onClick={onItemClick}
            selected={selectedItemId === item.id}
          />
        ))}
      </ul>
    </Card>
  </div>
);

export default Element;
