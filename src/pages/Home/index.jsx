import React, { useEffect } from 'react'
import { Card, Input, Row, Space } from 'antd'
// import { AudioOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout'
import styles from './style.less'
import { history } from 'umi'

import './style.less'
import { SearchBar } from '../../components/SearchBar'

const { Search } = Input

const HomePage = () => {

  useEffect(() => {
    // 获取所有的版块

    // 版块较热门的条目 3条
  }, [])

  return <GridContent>
    <div className={styles.main}>
      <Space direction="vertical" align='center'>

        <Row gutter={16} style={{ width: '800px' }}>
          <SearchBar/>
        </Row>

        <Space size={[6, 16]} wrap>
          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/movie')}}
          >
            电影
          </Card>

          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/rentAgent')}}
          >
            租房中介
          </Card>

          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/music')}}
          >
            音乐
          </Card>

          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/game')}}
          >
            游戏
          </Card>

          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/weChatMini')}}
          >
            微信小程序
          </Card>

          <Card
            className='center title'
            style={{ width: 300, height: 200 }}
            onClick={() => {history.push('/other')}}
          >
            其他
          </Card>


        </Space>

      </Space>
    </div>


  </GridContent>
}

export default HomePage
