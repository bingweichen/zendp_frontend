import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoAuthPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="对不起, 你没有权限访问该页面。请咨询管理员开通权限，或者登陆其他账号。" //"Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
);

export default NoAuthPage;
