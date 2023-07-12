import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';

const { Header } = Layout;
const { toggleCollapsed } = appActions;
//fungsi buat jam
function Clock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const currentTime = `${hours}:${minutes}:${seconds}`;
      setTime(currentTime);
      setDate(now.toDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{display: "flex", gap: "12px"}}>
      <h1>{time}</h1>
      <p>/</p>
      <p>{date}</p>
    </div>
  );
}
//
class Topbar extends Component {
  render() {
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            >
              <TopbarMenuIcon size={24} color={customizedTheme.textColor} />
            </button>
            <h3>PT. DASAN PAN PACIFIC INDONESIA</h3>
          </div>

          <ul className="isoRight">
            {/* <li className="isoSearch">
              <TopbarSearch locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'notification' })}
              className="isoNotify"
            >
              <TopbarNotification locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'message' })}
              className="isoMsg"
            >
              <TopbarMessage locale={locale} />
            </li>
            <li
              onClick={() => this.setState({ selectedItem: 'addToCart' })}
              className="isoCart"
            >
              <TopbarAddtoCart url={url} locale={locale} />
            </li> */}
            <div style={{marginRight: "12px"}}>
            <Clock/>
            </div>
            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  (state) => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);
