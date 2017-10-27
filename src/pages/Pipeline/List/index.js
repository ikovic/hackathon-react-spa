import React from 'react';
import './styles.css';

const Item = ({ selected, title, id, onClick }) => (
  <li className="listItem">
    <button onClick={() => onClick(id)}>{title}</button>
  </li>
);

const List = ({ items, active, onItemClick }) => (
  <ul className="pipeList">{items.map(item => <Item key={item.id} {...item} />)}</ul>
);

export default List;
