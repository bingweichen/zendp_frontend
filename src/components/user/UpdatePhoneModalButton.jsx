import React, { useState } from 'react'
import { Button, Form, message } from 'antd'
import DraggableModal from '../../components/DraggableModal'
import { update_user } from '../../services/user'
import { PhoneAndCaptcha } from '../../components/FormItem/PhoneAndCaptcha'

import {PhoneOutlined} from '@ant-design/icons'

export const UpdatePhoneModalButton = (props) => {
  const { user_id, dispatch, updateFunc } = props

  const [form] = Form.useForm()
  let [visible, setVisible] = useState(false)
  let [phoneValidateStatus, setPhoneValidateStatus] = useState('empty')

  return <>
    <PhoneOutlined onClick={() => setVisible(true)}/>

    <DraggableModal
      title={'更换手机号'}
      visible={visible}
      onOk={async() => {
        let values = await form.validateFields()

        // 自定义检查
        if (phoneValidateStatus !== 'success'){
          if(phoneValidateStatus === 'empty'){
            message.error('未发送验证码')
          }else{
            message.error('手机号填写错误')
          }
          return
        }

        // 直接发送后端请求
        const response = await update_user({
          id: user_id,
          phone: values.phone,
          captcha: values.captcha
        })
        if (response.status !== 400 && response.status !==500) {
          message.success('更新成功')
          setVisible(false)
          // 重新获取current_user
          updateFunc(values.phone)
        }else{
          message.error('更新失败')
        }
      }}
      onCancel={() => setVisible(false)}>
      <Form
        name="updatePhone"
        form={form}
      >
        <PhoneAndCaptcha
          form={form} type='register'
          setValidateStatusFunc={(value)=>{
            setPhoneValidateStatus(value)
          }}
        />
      </Form>
    </DraggableModal>
  </>

}
