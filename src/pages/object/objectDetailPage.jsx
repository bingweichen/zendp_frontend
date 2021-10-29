import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Col, Form, Input, List, Rate, Row, Space } from 'antd'
import { getPageQuery } from '@/utils/utils'
import { connect } from 'dva'

import { AudioOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import styles from './style.less'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import DraggableModal from '../../components/DraggableModal'

import { MovieBigCard } from './components/MovieCard'
import { history } from 'umi'
import {CommentsPaginationList} from '../../components/PaginationList'
import '../styles.less'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const ObjectPage = (props) => {
  const { objectModel, userModel, dispatch } = props
  const { isLogin, currentUser } = userModel

  // 是否可编辑
  let [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // 获取条目详情
    let objectId = props.match.params.objectId
    dispatch({
      type: 'object/getObject',
      payload: {
        id: objectId,
      },
    })
  }, [])

  useEffect(() => {
    // 如果登录了，且条目所有者和登录者相同，则可以编辑
    if (isLogin) {
      if (selectedEle) {
        if (selectedEle.creator && currentUser.id === selectedEle.creator.id) {
          setIsEdit(true)
        }
      }

    }
  }, [objectModel.selectedEle])

  const { selectedEle, isModalVisible } = objectModel
  const { id: objectId } = selectedEle

  return <PageHeaderWrapper>

    <Row>
      <Col span={20}>
        <MovieBigCard object={selectedEle}/>

        <Row justify='end'>
          <Button type='primary' style={{ margin: 20 }}
                  onClick={() => {
                    dispatch({
                      'type': 'object/save',
                      'payload': {
                        isModalVisible: true,
                      },
                    })
                  }}

          >
            发表评论
          </Button>
        </Row>

        <DraggableModal
          title={'发布评论'}
          visible={isModalVisible}
          onCancel={() => dispatch({
            type: `${'object'}/save`,
            payload: {
              isModalVisible: false,
            },
          })}
          footer={null}
        >
          <RateContainer objectId={objectId} dispatch={dispatch}/>

        </DraggableModal>


        <CommentList objectModel={objectModel} dispatch={dispatch} />
      </Col>

      <Col span={4}>
        {isEdit && <Button
          style={{ margin: 20 }}
          type='primary'
          onClick={() => {
            history.push({
              pathname: '/editObject',
              query: { objectId: objectId },
            })
          }}
        >
          编辑
        </Button>}
      </Col>
    </Row>

  </PageHeaderWrapper>
}

// 评论列表
const CommentList = (props) => {
  const { objectModel, dispatch} = props

  return <CommentsPaginationList
    objectModel={objectModel} dispatch={dispatch}

    itemLayout="vertical"
    size="large"

    renderItem={item => (
      <List.Item
        key={item.id} className={styles.basic_main}
      >

        <List.Item.Meta
          avatar={<Space><Avatar src={item.avatar}/>{item.creator.username}</Space>}

          title={<Rate allowHalf defaultValue={item.rate} disabled/>}
        />
        {item.desc}

      </List.Item>
    )}

  />
  // return (
  //   <List
  //     itemLayout="vertical"
  //     size="large"
  //     pagination={{
  //       onChange: page => {
  //         console.log(page)
  //       },
  //       pageSize: 3,
  //     }}
  //     dataSource={comments}
  //
  //     renderItem={item => (
  //       <List.Item
  //         key={item.id} className={styles.basic_main}
  //       >
  //
  //         <List.Item.Meta
  //           avatar={<Space><Avatar src={item.avatar}/>{item.creator.username}</Space>}
  //
  //           title={<Rate allowHalf defaultValue={item.rate} disabled/>}
  //         />
  //         {item.desc}
  //
  //       </List.Item>
  //     )}
  //   />
  // )
}

const RateContainer = (props) => {
  const { objectId, dispatch } = props

  const formRef = useRef()

  async function onFinish(values) {
    dispatch({
      type: `${'object'}/submitComment`,
      payload: {
        objectId,
        ...values,
      },
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}

      ref={formRef}
      name="RateForm"

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="评分" name="rate"
        rules={[{ required: true, message: '请填写评分!' }]}
      >
        <Rate allowHalf/>
      </Form.Item>

      <Form.Item
        label="评论" name="desc"
        rules={[{ required: true, message: '请填写评论!' }]}
      >

        <Input.TextArea rows={4} showCount maxLength={350} placeholder={'请填写您的评论'}/>
      </Form.Item>

      <Form.Item {...tailLayout}>

        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>

  )

}

export default connect(({ object, user, loading }) => ({
  objectModel: object,
  userModel: user,
  loading: loading.effects['object/getObject'],
}))(ObjectPage)

