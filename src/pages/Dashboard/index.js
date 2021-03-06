import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon, Timeline } from 'antd';
import { LineChart, XAxis, YAxis, Line } from 'recharts';
import { getPipelines, changeStatus } from 'redux/modules/pipelines';
import api from 'utils/api';

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
    const { status, title, id, showMoreText } = this.props;
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
            {showMoreText}
          </Button>
        </span>
      </div>
    );
  }
}

class PipelineBody extends React.Component {
  state = {
    chartWidth: null,
    preview: null,
    chartData: null,
  };
  componentDidMount() {
    this.setState({ chartWidth: this.chartHolder.offsetWidth });
    this.preview(this.props.item.template);
    this.generateChartData();
  }

  generateChartData() {
    this.setState({
      chartData: [
        { name: '01/01/16', gs: Math.floor(Math.random() * 6) + 1 },
        { name: '01/08/16', gs: Math.floor(Math.random() * 6) + 1 },
        { name: '01/15/16', gs: Math.floor(Math.random() * 6) + 1 },
        { name: '01/21/16', gs: Math.floor(Math.random() * 6) + 1 },
        { name: '01/28/16', gs: Math.floor(Math.random() * 6) + 1 },
      ],
    });
  }

  preview = values => {
    delete values.id;
    api
      .post('/templates/preview', values)
      .then(({ data }) => this.setState({ preview: { __html: data.html } }));
  };

  render() {
    const { item } = this.props;
    return (
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <div
          style={{
            width: '50%',
            padding: 10,
          }}
        >
          <div>
            <h2 style={{ marginBottom: 15 }}>Preview:</h2>
          </div>
          <div dangerouslySetInnerHTML={this.state.preview} />
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
            <h2 style={{ marginBottom: 15 }}>Number of triggered events:</h2>
          </div>
          <LineChart
            width={this.state.chartWidth - 50}
            height={150}
            data={this.state.chartData}
            margin={{ top: 5, right: 30, left: -30, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="gs"
              strokeWidth={4}
              stroke="#108ee9"
              activeDot={{ r: 8 }}
            />
          </LineChart>
          <div style={{ marginTop: 30 }}>
            <h2 style={{ marginBottom: 15 }}>Pipeline Flow:</h2>
          </div>
          <div style={{ marginTop: 10, paddingLeft: 10 }}>
            <Timeline>
              <Timeline.Item>{item.actor.name}</Timeline.Item>
              <Timeline.Item>{item.event.name}</Timeline.Item>
              <Timeline.Item>Publishing Ad on {item.target.name}</Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div>
    );
  }
}

class PipelineItem extends React.Component {
  state = {
    more: false,
    showMoreText: 'Show More',
  };

  changeStatus = (status, id) => {
    this.props.changeStatus(id, status);
  };

  toggleMore = () => {
    const showMoreText = this.state.more ? 'Show More' : 'Show Less';
    this.setState({
      more: !this.state.more,
      showMoreText: showMoreText,
    });
  };

  render() {
    const { more, showMoreText } = this.state;
    const { item } = this.props;
    return (
      <Card>
        <PipelineHeader
          title={item.name}
          status={item.status}
          id={item.id}
          showMoreText={showMoreText}
          onShowMore={this.toggleMore}
          changeStatus={this.changeStatus}
        />
        {more && <PipelineBody item={item} />}
      </Card>
    );
  }
}

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getPipelines();
  }

  render() {
    const { pipelines, changeStatus } = this.props;
    return (
      <div>
        {pipelines.items.map(item => (
          <PipelineItem item={item} key={item.id} changeStatus={changeStatus} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pipelines: state.pipelines,
});

const mapDispatchToProps = dispatch => ({
  getPipelines: () => dispatch(getPipelines()),
  changeStatus: (id, status) => dispatch(changeStatus(id, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
