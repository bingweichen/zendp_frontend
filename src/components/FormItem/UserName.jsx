import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { is_username_exist } from '../../services/user'
import { formatMessage } from 'umi'

export const UsernameFormItem = ({setValidateStatusFunc, label, InputSize='large'}) => {
  let [name, setName] = useState({
    value: '',
  })
  const onNameChange = async (e) => {
    let name = e.target.value

    // 判断是否手机号
    if (/^\d{11}$/.test(name)) {
      setName({
        value: "",
        validateStatus: 'error',
        errorMsg: '帐号必须由字母或数字组成,且不可为11位手机号',
      })

      setValidateStatusFunc('error')
      return
    }

    const response = await is_username_exist({ username: name })
    if (response.data.is_username_exist) {
      setName({
        value: name,
        validateStatus: 'error',
        errorMsg: '用户名已存在',
      })
      setValidateStatusFunc('error')
    } else {
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
      setValidateStatusFunc('success')
    }
  }
  return <Form.Item
    label={label}
    name="username"
    rules={[
      {
        required: true,
        message: '请输入用户名',
      },
    ]}
    validateStatus={name.validateStatus}
    help={name.errorMsg}
  >
    <Input
      size={InputSize}
      placeholder="用户名"
      value={name.value}
      onChange={onNameChange}/>
  </Form.Item>
}



