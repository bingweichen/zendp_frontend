import { getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { connect, FormattedMessage, Link, SelectLang, useIntl } from 'umi'
import React from 'react'
import logo from '../assets/logo.svg'
import styles from './UserLayout.less'
import { Button, Space } from 'antd'

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
    dispatch,
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: '',
    },
  } = props
  const { formatMessage } = useIntl()
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  })
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title}/>
      </Helmet>

      <div className={styles.container}>

        <div className={styles.lang}>
          <Space
          >
            <Button>
              <Link to="/">
                首页
              </Link>
            </Button>

            <SelectLang/>
          </Space>

        </div>


        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>极简点评</span>
              </Link>
            </div>
            <div className={styles.desc}>

            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default connect(({ settings }) => ({ ...settings }))(UserLayout)
