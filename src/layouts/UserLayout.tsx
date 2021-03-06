import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

import './UserLayout.less';

const links = [{
  title: 'Bạn bè',
  href: ''
}, {
  title: 'Thông báo',
  href: ''
}, {
  title: 'Tin nhắn',
  href: ''
}];

const copyright = <div>Copyright <Icon type="copyright"/> 2017 Dore Inc</div>;

class UserLayout extends React.PureComponent<any, any> {
  static childContextTypes = {
    location: PropTypes.object
  };

  getChildContext() {
    const {location} = this.props;
    return {location};
  }

  getPageTitle() {
    const {getRouteData, location} = this.props;
    const {pathname} = location;
    let title = 'Ant Design Pro';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }

  render() {
    const {getRouteData} = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={'container'}>
          <div className={'top'}>
            <div className={'header'}>
              <Link to="/">
                <img
                  alt=""
                  className={'logo'}
                  src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg"
                />
                <span className={'title'}>Ant Design</span>
              </Link>
            </div>
            <div className={'desc'}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <GlobalFooter className={'footer'} links={links} copyright={copyright}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
