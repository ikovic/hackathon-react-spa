import React from 'react';
import cx from 'classnames';
import './styles.css';

const Item = ({ selected, item, onClick }) => (
  <li className={cx('listItem', { selected })}>
    <button onClick={() => onClick(item.id)}>{item.name}</button>
  </li>
);

const List = ({ selectedItemId, items, active, onItemClick }) => (
  <ul className="pipeList">
    {items.map(item => (
      <Item key={item.id} item={item} onClick={onItemClick} selected={selectedItemId === item.id} />
    ))}
  </ul>
);

export default List;
