import React, { useState } from 'react'
import { Button, Form, message } from 'antd'
import DraggableModal from '../DraggableModal'
import { PasswordAndConfirm }from '../FormItem/PasswordAndConfirm'
import { update_user } from '../../services/user'

export const ResetPasswordModalButton = (props) => {
  const [form] = Form.useForm()

  let [visible, setVisible] = useState(false)
  const { user_id } = props
  return <>
    <Button
      type="primary" style={{ margin: 5 }}
      onClick={() => setVisible(true)}
    >
      重置密码
    </Button>

    <DraggableModal
      title={'重置密码'}
      visible={visible}
      onOk={async() => {
        let values = await form.validateFields()
        // 直接发送后端请求
        const response = await update_user({
          id: user_id,
          password: values.password
        })
        if (response.status !== 400 && response.status !==500) {
          message.success('更新成功')
          setVisible(false)
        }else{
          message.error('更新失败')
        }
      }}
      onCancel={() => setVisible(false)}>
      <Form
        name="resetPassword"
        form={form}
      >
        <PasswordAndConfirm form={form}/>
      </Form>
    </DraggableModal>
  </>

}
