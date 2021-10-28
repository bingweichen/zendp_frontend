import { Button, Result } from 'antd'
import { Link } from 'umi'

export const NoMatch = () => (
  <Result
    status={403}
    title="403"
    subTitle="对不起, 你没有权限访问该页面。请咨询管理员开通权限，或者登陆其他账号。"
    extra={
      <Button type="primary">
        <Link to="/user/login">去登录</Link>
      </Button>
    }
  />
)
