import React from 'react'
import { DatePicker, Form, Input, Select, Row, Col } from 'antd'

const { Option } = Select

export const CommonForm = ({}) => {
  let localCounter = 0
  return [
    <Form.Item
      label="姓名"
      name="nickname"
      rules={[{ required: true, message: '请输入你的姓名!' }]}
      key={localCounter++}
    >
      <Input.TextArea rows={1} showCount maxLength={50} placeholder={'请填写姓名'}/>
    </Form.Item>,

    <Form.Item label="是否启用" name="is_active" key={localCounter++}>
      <Select>
        <Option key={`user-is_active-option-1`} value={true}>
          启用
        </Option>
        <Option key={`user-is_active-option-2`} value={false}>
          无效
        </Option>
      </Select>
    </Form.Item>,

    <Form.Item
      label="身份证"
      name="identity"
      rules={[
        {
          pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
          message: '身份证输入不合法',
        },
      ]}
      key={localCounter++}
    >
      <Input.TextArea rows={1} showCount maxLength={18} placeholder={'请填写身份证'}/>
    </Form.Item>,

    <Form.Item
      label="邮箱"
      name="email"
      rules={[
        {
          type: 'email',
        },
      ]}
      key={localCounter++}
    >
      <Input.TextArea rows={1} showCount maxLength={50} placeholder={'请填写邮箱'}/>
    </Form.Item>,

    <Form.Item
      label="入司时间"
      name="join_date"
      key={localCounter++}
    >
      <DatePicker/>
    </Form.Item>,

    <Form.Item
      label="备注"
      name="notes"
      key={localCounter++}
    >
      <Input.TextArea rows={1} showCount maxLength={500} placeholder={'请填写备注'}/>
    </Form.Item>,
  ]
}

