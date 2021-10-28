import React, { useState } from 'react'
import styles from '../register/style.less'
import { Button, Form } from 'antd'
import { connect, formatMessage, FormattedMessage, Link } from 'umi'
import { PasswordAndConfirm } from '../../../components/FormItem/PasswordAndConfirm'
import { PhoneAndCaptcha } from '../../../components/FormItem/PhoneAndCaptcha'
import { message } from 'antd/lib/index'

const FormItem = Form.Item

const ResetPassword = ({resetPassword, submitting, dispatch}) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    if (resetPassword.phoneValidateStatus !== 'success'){
      if(resetPassword.phoneValidateStatus === 'empty'){
        message.error('未发送验证码')
      }else{
        message.error('手机号填写错误')
      }
      return
    }

    dispatch({
      type: 'resetPassword/submit',
      payload: { ...values },
    })
  }

  return (
    <div className={styles.main}>
      <h3>
        重置密码
      </h3>

      <Form form={form} name="resetPassword" onFinish={onFinish}
            autoComplete="off"
      >
        <PhoneAndCaptcha
          form={form}
          setValidateStatusFunc={(value)=>{
            dispatch({
              type: "resetPassword/save",
              payload: {
                phoneValidateStatus: value
              }
            })
          }}
        />
        <PasswordAndConfirm form={form}/>

        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            重置密码
          </Button>

          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </FormItem>

      </Form>
    </div>
  )
}

export default connect(({ resetPassword, loading }) => ({
  resetPassword,
  submitting: loading.effects['resetPassword/submit'],
}))(ResetPassword)
