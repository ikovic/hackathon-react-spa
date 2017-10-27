import React from 'react';
import '.styles.css';

const Item = ({ selected, title, id, onClick }) => (
  <li key={id}>
    <button onClick={onClick}>{title}</button>
  </li>
);

const List = ({ items, active, onItemClick }) => (
  <ul className="pipeList">{items.map(item => <Item {...item} />)}</ul>
);

export default List;
