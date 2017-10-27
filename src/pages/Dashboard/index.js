import React from 'react';
import { Card, Button, Icon } from 'antd';

const STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  DELETED: 'deleted',
};

class PipelineHeader extends React.Component {
  toggleActive = (status, id) => {
    if (status === STATUS.ACTIVE) {
      this.props.changeStatus(STATUS.PAUSED, id);
    } else {
      this.props.changeStatus(STATUS.ACTIVE, id);
    }
  };

  render() {
    const { status, title, id } = this.props;
    let icon = <Icon type="play-circle-o" />;
    let activationButtonText = 'Pause';
    if (status === STATUS.PAUSED) {
      icon = <Icon type="pause-circle-o" />;
      activationButtonText = 'Start';
    } else if (status === STATUS.DELETED) {
      icon = <Icon type="close-circle-o" />;
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex' }}>
          <div style={{ paddingRight: '15px', fontSize: '18px' }}>{icon}</div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {title}
          </div>
        </span>
        <span>
          <Button.Group style={{ paddingRight: '15px' }}>
            <Button
              type="primary"
              disabled={status === STATUS.DELETED}
              onClick={this.toggleActive.bind(this, status, id)}
            >
              {activationButtonText}
            </Button>
            <Button
              type="danger"
              disabled={status === STATUS.DELETED}
              onClick={this.props.changeStatus.bind(this, STATUS.DELETED, id)}
            >
              Delete
            </Button>
          </Button.Group>
          <Button type="normal" onClick={this.props.onShowMore}>
            Show more
          </Button>
        </span>
      </div>
    );
  }
}

class PipelineBody extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Card.Grid style={{ width: '50%' }}>Preview</Card.Grid>
        <Card.Grid style={{ width: '50%' }}>Chart</Card.Grid>
      </div>
    );
  }
}

class PipelineItem extends React.Component {
  state = {
    more: false,
  };

  changeStatus = (status, id) => {
    console.log('call api with this shit', status, id);
  };

  toggleMore = () => {
    this.setState({ more: !this.state.more });
  };

  render() {
    const { more } = this.state;
    return (
      <Card>
        <PipelineHeader
          title={this.props.title}
          status={this.props.status}
          id={this.props.id}
          onShowMore={this.toggleMore}
          changeStatus={this.changeStatus}
        />
        {more && <PipelineBody />}
      </Card>
    );
  }
}

const items = [
  {
    id: 1,
    title: 'prvi',
    status: 'active',
  },
  {
    id: 2,
    title: 'drugi',
    status: 'paused',
  },
  {
    id: 3,
    title: 'treci',
    status: 'deleted',
  },
  {
    id: 4,
    title: 'cetvrti',
    status: 'paused',
  },
  {
    id: 5,
    title: 'peti',
    status: 'active',
  },
];

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {items.map(item => (
          <PipelineItem title={item.title} status={item.status} key={item.id} id={item.id} />
        ))}
      </div>
    );
  }
}

export default Dashboard;
