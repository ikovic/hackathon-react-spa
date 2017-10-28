import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'antd';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

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

const chartData = [
  { name: '01/01/16', gs: 1 },
  { name: '01/08/16', gs: 3 },
  { name: '01/15/16', gs: 0 },
  { name: '01/21/16', gs: 4 },
  { name: '01/28/16', gs: 2 },
];

class PipelineBody extends React.Component {
  state = {
    chartWidth: null,
  };
  componentDidMount() {
    this.setState({ chartWidth: this.chartHolder.offsetWidth });
  }

  render() {
    return (
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <div
          style={{
            width: '50%',
            padding: 10,
          }}
        >
          <div>
            <h3>Preview:</h3>
          </div>
          <iframe
            frameBorder="0"
            src="https://www.facebook.com/ads/api/preview_iframe.php?d=AQJND3jDjXZLSAZ0KrT1Z1mwnOlipP51WSclhNLRNS44rCtKfbsaClO5cTSdcvQwlBwgZKLZ-lYJIKFwixl_XoDZ0DuQZe4WI3A_K3HD-QxshGFeT5hpAs7KqQ-OX3CbEwXl3KxTbZRE76LEJ8pvfryX93KyYApXgzIsCF3ZStLb0124g2nlWXyZMp0SEG-yng5_IiXGXmuiTj2aoGg9ngmNlgx6SQUyfuct6FK1RjEDQFJaD4nw6bTA795-R6IzWjEjW8LwFCtKn1h_RWRjWwBIPJi_hxj6iVVn2AM7iR65Sd5f-5yYvHYJlNThtTFzPYEMSf5Nydrb_tQ2Swr-vdsLF9PpKr8HLmJmTlKvOv0alROjHZL0A2zoQFwQ7DbPxrJa0vlxt3O1HJXXnk3Kd-PG7_7g7Nw1a2h-2O16W1WNhvB5C7sY4l33iYaNIBJL5i28Pam72JDsT8MuvoVk7xCyE-xJe0Ze1G7jTW7NbhnkkHemOs4Rc5GSGoWI_vRwwUmdpV472dWwdoI7_fDV6GeAd7JgCluo9f3fZmtT55l9I9FwPa3chrLy47aIuLzukIy3Hvo8w26B0v4rTY5dcOVjBHP3fmGrR9-1FxFXO2xRxZ5ArmO7dBwGcslkKi_ZVsflTGQrBfrfwUIDq_yNpFbkQ4pJXwIzWSqS1JsNcq4iOsvCJFtmzIe38kjPgJo0TQzulYpazC3ygJCIg1j9O8zHWgAhClDta4Hp4DdhjcFpSt-sLzc-l1qJyOHtLBvK65_if4msINaJWjdvTeG11kdVsk1rj6uONomlajJ8d3sxdMtU4edgHkGf7u7sCNAT4X4&amp;t=AQKzmnQRXnkAKVR5"
            width="505"
            height="435"
            scrolling="no"
            style={{ border: 'none' }}
          />
        </div>
        <div
          ref={input => {
            this.chartHolder = input;
          }}
          style={{
            width: '50%',
            height: 483,
            padding: 10,
          }}
        >
          <div>
            <h3>Number of triggered events:</h3>
          </div>
          <LineChart
            width={this.state.chartWidth - 50}
            height={150}
            data={chartData}
            margin={{ top: 5, right: 30, left: -30, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="gs"
              strokeWidth={4}
              stroke="#108ee9"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
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

class Dashboard extends React.Component {
  render() {
    const { pipelines } = this.props;
    return (
      <div>
        <h1>Dashboard</h1>
        {pipelines.items.map(item => (
          <PipelineItem title={item.title} status={item.status} key={item.id} id={item.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pipelines: state.pipelines,
});

export default connect(mapStateToProps)(Dashboard);
