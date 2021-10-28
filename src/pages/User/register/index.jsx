import { Button, Form, Input, message, Popover, Progress, Select } from 'antd'
import { connect, formatMessage, FormattedMessage, Link, useIntl } from 'umi'
import { PhoneAndCaptcha } from '../../../components/FormItem/PhoneAndCaptcha'
import { UsernameFormItem } from '../../../components/FormItem/UserName'
import { PasswordAndConfirm } from '../../../components/FormItem/PasswordAndConfirm'

import React, { useEffect, useState } from 'react'
import styles from './style.less'

const FormItem = Form.Item
const { Option } = Select
const InputGroup = Input.Group
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong"/>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium"/>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short"/>
    </div>
  ),
}
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
}

const Register = ({ submitting, dispatch, userAndregister }) => {
  const intl = useIntl()

  const [count, setcount] = useState(0)
  const [visible, setvisible] = useState(false)
  const [prefix, setprefix] = useState('86')
  const [popover, setpopover] = useState(false)
  const confirmDirty = false
  let interval
  const [form] = Form.useForm()
  useEffect(() => {
    if (!userAndregister) {
      return
    }
    // const account = form.getFieldValue('mail')
    // if (userAndregister.status === 'ok') {
    //   message.success('注册成功！')
    //   // 跳转到首页
    //   router.push({
    //     pathname: '/',
    //   })
    // }
  }, [userAndregister])
  useEffect(() => {
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onGetCaptcha = async () => {
    const values = await form.validateFields(['phone'])
    if (userAndregister.phone.validateStatus !== 'error') {
      dispatch({
        type: 'userAndregister/sendCaptcha',
        payload: {
          phone: values.phone,
        },
      })
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

  const onFinish = (values) => {

    // if (userAndregister.usernameValidateStatus !== 'success'){
    //   message.error('用户名填写错误')
    //   return
    // }
    if (userAndregister.phoneValidateStatus !== 'success'){
      if(userAndregister.phoneValidateStatus === 'empty'){
        message.error('未发送验证码')
        return
      }
      // else{
      //   message.error('手机号填写错误')
      // }
      // return
    }
    dispatch({
      type: 'userAndregister/submit',
      payload: { ...values, prefix },
    })
  }

  const checkConfirm = (_, value) => {
    const promise = Promise

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        intl.formatMessage({
          id: 'userandregister.password.twice',
        }),
      )
    }

    return promise.resolve()
  }

  const checkPassword = (_, value) => {
    const promise = Promise // 没有值的情况

    if (!value) {
      setvisible(!!value)
      return promise.reject(
        intl.formatMessage({
          id: 'userandregister.password.required',
        }),
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

  const onUsernameChange = e => {
    // 向后端获取校验
    dispatch({
      type: 'userAndregister/validateUsername',
      payload: {
        username: e.target.value,
      },
    })
  }


  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="userandregister.register.register"/>
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>

        {/*<FormItem*/}
          {/*name="company_name"*/}
          {/*rules={[*/}
            {/*{*/}
              {/*required: true,*/}
              {/*message: '请输入公司名称',*/}
            {/*},*/}
          {/*]}*/}
        {/*>*/}
          {/*<Input*/}
            {/*size="large"*/}
            {/*placeholder="公司名称"*/}
          {/*/>*/}
        {/*</FormItem>*/}

        {/*<UsernameFormItem*/}
          {/*setValidateStatusFunc={(value)=>{*/}
            {/*dispatch({*/}
              {/*type: "userAndregister/save",*/}
              {/*payload: {*/}
                {/*usernameValidateStatus: value*/}
              {/*}*/}
            {/*})*/}
          {/*}}*/}
        {/*/>*/}

        <PhoneAndCaptcha
          form={form} type='register'
          setValidateStatusFunc={(value)=>{
            dispatch({
              type: "userAndregister/save",
              payload: {
                phoneValidateStatus: value
              }
            })
          }}
        />

        <PasswordAndConfirm form={form}/>

        {/*<FormItem*/}
          {/*name="email"*/}
          {/*rules={[*/}
            {/*{*/}
              {/*required: false,*/}
              {/*message: intl.formatMessage({*/}
                {/*id: 'userandregister.email.required',*/}
              {/*}),*/}
            {/*},*/}
            {/*{*/}
              {/*type: 'email',*/}
              {/*message: intl.formatMessage({*/}
                {/*id: 'userandregister.email.wrong-format',*/}
              {/*}),*/}
            {/*},*/}
          {/*]}*/}
        {/*>*/}
          {/*<Input*/}
            {/*size="large"*/}
            {/*placeholder={intl.formatMessage({*/}
              {/*id: 'userandregister.email.placeholder',*/}
            {/*})}*/}
          {/*/>*/}
        {/*</FormItem>*/}

        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister.register.register"/>
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="userandregister.register.sign-in"/>
          </Link>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({ userAndregister, loading }) => ({
  userAndregister,
  submitting: loading.effects['userAndregister/submit'],
}))(Register)
