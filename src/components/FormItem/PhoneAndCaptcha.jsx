import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, message, Row, Select } from 'antd'
import { is_phone_exist, send_captcha } from '../../services/user'
import { formatMessage } from 'umi'
import styles from './style.less'

const { Option } = Select
const InputGroup = Input.Group

// 手机号的两种
// 1. reset 手机号不存在报错
// 2. register 手机号已经存在报错
export const PhoneAndCaptcha = ({ form, type="reset", setValidateStatusFunc }) => {
  let [name, setName] = useState({
    value: '',
  })
  const [count, setcount] = useState(0)
  const [prefix, setprefix] = useState('86')
  let interval

  useEffect(() => {
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onNameChange = async (e) => {
    let phone = e.target.value
    if (phone) {
      setName({
        value: '',
      })
    }
  }

  const changePrefix = (value) => {
    setprefix(value)
  }

  const sendCaptcha = async ({ phone }) => {
    const response = await send_captcha({ phone })
    if (response.status !== 400 && response.status !== 500) {
      message.success('验证码发送成功')
    } else {
      message.error('验证码发送失败')
    }
  }

  const onGetCaptcha = async () => {
    const values = await form.validateFields(['phone'])
    // 向后端校验一遍
    const response = await is_phone_exist({ phone: values.phone })

    let sendSmsFlag = false;

    if (response.data.is_phone_exist) {
      if(type === 'reset'){
        // type: reset 存在就发短信
        sendSmsFlag = true
      }else{
        // type: register 存在就报错
        setName({
          value: name,
          validateStatus: 'error',
          errorMsg: '该手机号已经注册过,请直接登录',
        })
        setValidateStatusFunc('error')
      }
    } else {
      if(type === 'reset'){
        // type: reset 不存在就报错
        setName({
          value: name,
          validateStatus: 'error',
          errorMsg: '该手机号尚未注册过,请先注册',
        })
        setValidateStatusFunc('error')
      }else{
        // type: register 不存在就发短信
        sendSmsFlag = true
      }
    }

    if(sendSmsFlag){
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
      setValidateStatusFunc('success')
      await sendCaptcha({ phone: values.phone })
      let counts = 59
      setcount(counts)
      interval = window.setInterval(() => {
        counts -= 1
        setcount(counts)

        if (counts === 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  return <>
    <InputGroup compact>
      <Select
        size="large"
        value={prefix}
        onChange={changePrefix}
        style={{
          width: '20%',
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>

      <Form.Item
        style={{
          width: '80%',
        }}
        name="phone"
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^\d{11}$/,
            message: '手机号格式错误！',
          },
        ]}

        validateStatus={name.validateStatus}
        help={name.errorMsg}
        labelAlign='left'
      >
        <Input
          maxLength={50}
          placeholder='请填写手机号'
          size="large"
          onChange={onNameChange}

        />
      </Form.Item>
    </InputGroup>

    <Row gutter={8}>
      <Col span={16}>
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        >
          <Input
            size="large"
            placeholder='验证码'
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Button
          size="large"
          disabled={!!count}
          style={{ width: '100%' }}
          className={styles.getCaptcha}
          onClick={onGetCaptcha}
        >
          {count
            ? `${count} s`
            : <div>获取验证码</div>}
        </Button>
      </Col>
    </Row>
  </>
}



