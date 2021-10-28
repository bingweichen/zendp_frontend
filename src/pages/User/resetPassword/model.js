import { is_phone_exist, is_username_exist, resetPassword, send_captcha } from '../../../services/user'
import { message } from 'antd'
import {  history as router } from 'umi'

const Model = {
  namespace: 'resetPassword',
  state: {
    phoneValidateStatus: "empty"
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload)
      if (response.message === 'Successfully reset password!') {
        // 保存token 设置登录状态
        localStorage.setItem('token', response.data.Authorization)
        // 提示成功 跳转页面
        message.success('密码重置成功！')
        router.push({
          pathname: '/',
        })
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

  },
}
export default Model
