import React, { useEffect, useRef } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { connect } from 'dva'

import { AudioOutlined } from '@ant-design/icons'
import { getPageQuery } from '@/utils/utils'
import styles from './style.less'
import { GridContent } from '@ant-design/pro-layout'
import { PageHeaderWrapper } from '@ant-design/pro-layout'

import {BasicFormItems} from './components/basicFormItems'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const UpdateObjectPage = (props) => {
  const { dispatch } = props

  useEffect(async () => {
    // 获取条目详情
    let objectId = getPageQuery().objectId
    dispatch({
      type: 'object/getObject',
      payload: {
        id: objectId
      }
    })
  }, [])


  return <PageHeaderWrapper>

    <div className={styles.main}>
      <UpdateObjectForm {...props}/>
    </div>
  </PageHeaderWrapper>
}

// 编辑条目
const UpdateObjectForm = (props) => {
  const {objectModel, dispatch} = props
  const {selectedEle} = objectModel

  const formRef = useRef()

  useEffect(()=>{
    // 将内容填入
    formRef.current.setFieldsValue({
      name: selectedEle.name,
      category_name: selectedEle.category && selectedEle.category.name,
      desc: selectedEle.desc,
      detail: selectedEle.detail,
    })

  }, [selectedEle])

  async function onFinish(values) {
    dispatch({
      type: `${'object'}/submitUpdate`,
      payload: {
        id: selectedEle.id,
        ...values,
      },
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }


  const basicFormItems = BasicFormItems({disabled:true})

  return <Form
    {...layout}

    ref={formRef}
    name="CreateSkuForm"

    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    {basicFormItems.name}
    {basicFormItems.category}
    {basicFormItems.desc}
    {basicFormItems.detail}


    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form.Item>
  </Form>
}

export default connect(({ object, loading }) => ({
  objectModel: object,
  loading: loading.effects['object/getObject'],
}))(UpdateObjectPage)
