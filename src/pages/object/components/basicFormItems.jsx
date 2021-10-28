import React from 'react'
import { Form, Input, Select } from 'antd'

import { AudioOutlined } from '@ant-design/icons'
import { getPageQuery } from '@/utils/utils'

const CategorySelectFormItem = ({disabled}) => {
  return <Form.Item label="版块" name="category_name">
    <Select disabled={disabled}>
      <Select.Option key={`CategorySelect-option-1`} value={'电影'}>
        电影
      </Select.Option>
      <Select.Option key={`CategorySelect-option-2`} value={'租房中介'}>
        租房中介
      </Select.Option>
      <Select.Option key={`CategorySelect-option-3`} value={'音乐'}>
        音乐
      </Select.Option>
      <Select.Option key={`CategorySelect-option-2`} value={'游戏'}>
        游戏
      </Select.Option>
    </Select>
  </Form.Item>
}

export const BasicFormItems = ({disabled}) => {
  return {
    name:
      <Form.Item
        label="条目名称" name="name"
        rules={[{ required: true, message: '请填写条目名称!' }]}
      >
        <Input maxLength={50} placeholder="请填写条目名称"/>
      </Form.Item>,

    category: <CategorySelectFormItem disabled={disabled}/>,
    desc: <Form.Item label="简短描述" name="desc">
      <Input.TextArea rows={2} showCount maxLength={350} placeholder={'请填写姓名'}/>
    </Form.Item>,
    detail: <Form.Item label="详细内容" name="detail">
      <Input.TextArea rows={2} showCount maxLength={350} placeholder={'请填写姓名'}/>
    </Form.Item>,
    image_url: '',
    tags: '',
  }
}

