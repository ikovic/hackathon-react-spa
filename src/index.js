import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider, Layout, Menu } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import Pipeline from 'pages/Pipeline';
import store from 'redux/index';

import 'antd/dist/antd.css';
import './styles.css';

const { Header, Content, Footer } = Layout;

const routes = {
  home: '/',
  editor: '/pipeline',
};

class App extends React.Component {
  render() {
    return (
      <Layout
        className="layout"
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
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
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key={routes.home}>
              <Link to={routes.home}>Home</Link>
            </Menu.Item>
            <Menu.Item key={routes.editor}>
              <Link to={routes.editor}>Pipeline</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', display: 'flex' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, flex: 1 }}>
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

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
