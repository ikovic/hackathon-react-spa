import React from 'react';
import { Card, Icon } from 'antd';
import cx from 'classnames';
import TemplateModal from 'pages/Pipeline/TemplateModal';
import './styles.css';

const Item = ({ selected, item, onClick }) => (
  <li className={cx('listItem', { selected })}>
    <button onClick={() => onClick(item.id)}>{item.name}</button>
  </li>
);

const Placeholder = ({ icon = 'api' }) => (
  <div className="placeholder">
    <Icon type={icon} style={{ fontSize: 64 }} />
  </div>
);

const Element = ({
  selectedItemId,
  items,
  title,
  active,
  disabled,
  loading,
  placeholder,
  onItemClick,
}) => (
  <div className={cx('elementCard', { active })}>
    <Card title={title} loading={loading} bodyStyle={{ padding: 0 }}>
      {disabled ? (
        <Placeholder icon={placeholder} />
      ) : (
        <ul className="pipeList">
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              onClick={onItemClick}
              selected={selectedItemId === item.id}
            />
          ))}
          {title === 'Template' ? (
            <li className="listItem">
              <TemplateModal />
            </li>
          ) : null}
        </ul>
      )}
    </Card>
  </div>
);

export default Element;
