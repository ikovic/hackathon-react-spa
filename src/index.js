import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, Layout, Menu } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import Pipeline from 'pages/Pipeline';

import 'antd/dist/antd.css';
import './styles.css';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <a href="https://seekandhit.com">
              <img
                className="logoImage"
                src="https://seekandhit.com/wp-content/themes/sih-2014/img/seekandhit.svg"
                alt="SeekandHit Internet Marketing"
              />
            </a>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/pipeline">Pipeline</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pipeline" component={Pipeline} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SeekandHit ©2017</Footer>
      </Layout>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
