import React, { useEffect, useState } from 'react'
import { Col, Input, Menu, Row, Space, List, Avatar, Rate } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import styles from './style.less'
import { history } from 'umi'
import { getPageQuery } from '@/utils/utils'
import { CustomImage } from '../../components/ImagePage/CustomImage'
import { connect } from 'dva'
import { globalConstant } from '../../utils/utils'
import { ObjectsPaginationList } from '../../components/PaginationList'

import './style.less'

const { Search } = Input

const menuMap = {
  全部: '全部',
  电影: '电影',
  租房中介: '租房中介',
  音乐: '音乐',
  游戏: '游戏',
  微信小程序: '微信小程序',
  其他: '其他',

  // all: '全部',
  // movie: '电影',
  // rentAgent: '租房中介',
  // music: '音乐',
  // game: '游戏',
}

const SearchObjectPage = (props) => {
  const { objectsModel, dispatch } = props
  const { objects, search_str, category_name } = objectsModel


  useEffect(() => {
    // 获取query
    let query = getPageQuery().q
    let category_name = getPageQuery().category_name

    if(!category_name){
      category_name = '全部'
    }

    dispatch({
      type: 'objects/handleSearchAndChangeCategory',
      payload: {
        search_str: query,
        category_name: category_name
      }
    })


  }, [])

  return <GridContent>
    <div>
        <Row gutter={16} style={{ width: '800px', margin: 20 }}>
          <Search
            value={search_str}
            placeholder="输入你要搜索的条目"
            onChange={(e)=>{
              dispatch({
                type: 'objects/save',
                payload: {
                  search_str: e.target.value,
                }
              })
            }}
            onSearch={(value) => {
              dispatch({
                type: 'objects/handelSearch',
                payload: {
                  search_str: value,
                }
              })
            }}
            enterButton/>
        </Row>

        <Row gutter={16} justify='start' style={{ margin: 20 }}>
          <Col style={{ width: '200px', marginRight: 50 }}>
            <Menu
              style={{ width: '200px' }}

              selectedKeys={[category_name]}

              onClick={({ key }) => {
                dispatch({
                  type: 'objects/handleChangeCategory',
                  payload: {
                    // search_str: search_str,
                    category_name: key
                  }
                })
              }}
              mode={'inline'}
            >
              {
                Object.keys(menuMap).map((item) => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>)
              }
            </Menu>
          </Col>

          <Col span={20} >
              <ObjectList objectsModel={objectsModel} dispatch={dispatch}/>

          </Col>

        </Row>
    </div>

  </GridContent>
}


const ObjectList = (props) => {
  const { objectsModel, dispatch,  } = props

  return <ObjectsPaginationList
    objectsModel={objectsModel} dispatch={dispatch}
    itemLayout="vertical"
    size="large"

    renderItem={item => (
      <List.Item
        key={item.id} className={styles.basic_main}
        style={{height: 150}}
      >

        <Row justify='space-between'>
          <Col span={20}>

            <Row>
              <div style={{marginRight:5}}>
                [{item.category.name}]
              </div>

              <a href={`/${globalConstant.categoryName2urlMapping[item.category.name]}/objects/${item.id}`}>
                {item.name}
              </a>
            </Row>

            <Row align='middle'>
              <Rate allowHalf value={item.rate} disabled style={{marginRight: 20}}/>
              {item.rate}
            </Row>

            <Row>
              {item.desc}
            </Row>

          </Col>

          <Col >
            <CustomImage src={item.image_url} width={120}/>
          </Col>
        </Row>
      </List.Item>
    )}
  />
}

export default connect(({ objects, loading }) => ({
  objectsModel: objects,
  loading: loading.effects['objects/getObjects'],
}))(SearchObjectPage)
