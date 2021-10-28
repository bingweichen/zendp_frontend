import React, { useState } from 'react'
import { Form, Input, Popover, Progress } from 'antd'
import styles from './style.less'

const FormItem = Form.Item

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      强度：强
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      强度：中
    </div>
  ),
  poor: (
    <div className={styles.error}>
      强度：太短
    </div>
  ),
}
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
}

export const PasswordAndConfirm = ({
                                     form,
                                     type = 'register', // 'create'
                                   }) => {
  const [visible, setvisible] = useState(false)
  const [popover, setpopover] = useState(false)
  const confirmDirty = false

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password')
    if (value && value.length > 9) {
      return 'ok'
    }
    if (value && value.length > 5) {
      return 'pass'
    }
    return 'poor'
  }

  const checkPassword = (_, value) => {
    const promise = Promise // 没有值的情况

    if (!value) {
      setvisible(!!value)
      return promise.reject(
        '请输入密码！',
      )
    } // 有值的情况

    if (!visible) {
      setvisible(!!value)
    }

    setpopover(!popover)

    if (value.length < 6) {
      return promise.reject('')
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm'])
    }

    return promise.resolve()
  }

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password')
    const passwordStatus = getPasswordStatus()
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null
  }

  const checkConfirm = (_, value) => {
    const promise = Promise

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        '两次输入的密码不匹配!',
      )
    }
    return promise.resolve()
  }

  return <>
    <Popover
      getPopupContainer={(node) => {
        if (node && node.parentNode) {
          return node.parentNode
        }

        return node
      }}
      content={
        visible && (
          <div
            style={{
              padding: '4px 0',
            }}
          >
            {passwordStatusMap[getPasswordStatus()]}
            {renderPasswordProgress()}
            <div
              style={{
                marginTop: 10,
              }}
            >
              请至少输入 6 个字符。请不要使用容易被猜到的密码。
            </div>
          </div>
        )
      }
      overlayStyle={{
        width: 240,
      }}
      placement="right"
      visible={visible}
    >
      <FormItem
        name="password"
        className={
          form.getFieldValue('password') &&
          form.getFieldValue('password').length > 0 &&
          styles.password
        }
        rules={[
          {
            required: true,
            validator: checkPassword,
          },
        ]}
        label={type==='register'?null:'密码'}
      >
        <Input
          size={type==='register'?"large":'middle'}

          type="password"
          placeholder={'至少6位密码，区分大小写'}
          autoComplete="new-password"
        />
      </FormItem>
    </Popover>

    <FormItem
      name="confirm"
      label={type==='register'?null:'重复密码'}
      rules={[
        {
          required: true,
          message: '请确认密码！',
        },
        {
          validator: checkConfirm,
        },
      ]}
    >
      <Input
        size={type==='register'?"large":'middle'}
        type="password"
        placeholder={'确认密码'}
      />
    </FormItem>
  </>

}





