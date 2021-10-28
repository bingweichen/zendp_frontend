import React, { useEffect, useRef } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { connect } from 'dva'

import { AudioOutlined } from '@ant-design/icons'
import { getPageQuery } from '@/utils/utils'
import styles from './style.less'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import {BasicFormItems} from './components/basicFormItems'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}


const AddObjectPage = (props) => {
  const { dispatch } = props
  // 新增表单
  const formRef = useRef()

  useEffect(async () => {
    // 获取条目详情
    let category_name = getPageQuery().objectCategory

    formRef.current.setFieldsValue({
      category_name: category_name,
    })

  }, [])

  async function onFinish(values) {
    dispatch({
      type: `${'object'}/submitCreate`,
      payload: {
        ...values,
      },
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const basicFormItems = BasicFormItems({})

  return <PageHeaderWrapper>
    <div className={styles.main}>
      <Form
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
    </div>
  </PageHeaderWrapper>
}

export default connect(({ object, loading }) => ({
  objectModel: object,
  loading: loading.effects['object/getObject'],
}))(AddObjectPage)
