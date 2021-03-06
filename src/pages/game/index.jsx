import React, { useEffect } from 'react'
import { Button, Card, Input, List, Row, Space } from 'antd'
import { history } from 'umi'
import { connect } from 'dva'

import { AudioOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { GridContent } from '@ant-design/pro-layout'
import styles from './style.less'
import { CustomImage } from '../../components/ImagePage/CustomImage'

const { Search } = Input

import { SearchBar } from '../../components/SearchBar'

const category_name = '游戏'
const urlHeader = 'game'

import { ObjectsPaginationList } from '../../components/PaginationList'

const GamePage = (props) => {

  const { objectsModel, dispatch } = props
  const { objects } = objectsModel

  useEffect(() => {
    // 获取电影条目
    dispatch({
      type: 'objects/handleChangeCategory',
      payload: {
        category_name: '游戏',
      },
    })

  }, [])

  return <GridContent>
    <div className={styles.main}>

      <Space direction="vertical">
        <Row gutter={16} justify='space-between'>
          <SearchBar category_name={category_name}/>

          <Button type='primary' onClick={() => {
            history.push({
              pathname: 'addObject',
              query: { objectCategory: category_name },
            })
          }}>
            创建条目
          </Button>
        </Row>

        <ObjectsPaginationList
          objectsModel={objectsModel} dispatch={dispatch}
          grid={{ gutter: 16, column: 4 }}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                className='center'
                hoverable
                onClick={() => {
                  history.push(`/${urlHeader}/objects/${item.id}`)
                }}
              >
                <div>
                  <CustomImage src={item.image_url}/>
                </div>

                <div>
                  {item.name}
                </div>

                <div>
                  {item.rate}
                </div>

              </Card>
            </List.Item>
          )}
        />

      </Space>
    </div>


  </GridContent>
}

export default connect(({ objects, loading }) => ({
  objectsModel: objects,
  loading: loading.effects['objects/getObjects'],
}))(GamePage)
