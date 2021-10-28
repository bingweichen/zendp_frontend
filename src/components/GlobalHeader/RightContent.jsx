import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const menu = {
  name: 'account',
  icon: 'user',
  path: '/account',
  routes: [
    {
      path: '/',
      redirect: '/account/center',
    },
    {
      name: 'center',
      icon: 'smile',
      path: '/account/center',
      component: './DefaultPage',
    },
    {
      name: 'settings',
      icon: 'smile',
      path: '/account/settings',
      component: './DefaultPage',
      // authority: ['USER_SETTING', 'SYSTEM_SETTING']
    },
  ],
}
const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/*<HeaderSearch*/}
        {/*className={`${styles.action} ${styles.search}`}*/}
        {/*placeholder="站内搜索"*/}
        {/*defaultValue="umi ui"*/}
        {/*options={[*/}
          {/*{*/}
            {/*label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,*/}
            {/*value: 'umi ui',*/}
          {/*},*/}
          {/*{*/}
            {/*label: <a href="next.ant.design">Ant Design</a>,*/}
            {/*value: 'Ant Design',*/}
          {/*},*/}
          {/*{*/}
            {/*label: <a href="https://protable.ant.design/">Pro Table</a>,*/}
            {/*value: 'Pro Table',*/}
          {/*},*/}
          {/*{*/}
            {/*label: <a href="https://prolayout.ant.design/">Pro Layout</a>,*/}
            {/*value: 'Pro Layout',*/}
          {/*},*/}
        {/*]} // onSearch={value => {*/}
        {/*//   //console.log('input', value);*/}
        {/*// }}*/}
      {/*/>*/}
      <Tooltip title="用户指南">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href='http://doc.jxcjxc.com/'
          // href="https://juejin.cn/post/6947925260171739167"

          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar menu={menu}/>
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
