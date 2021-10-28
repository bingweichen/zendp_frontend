import { is_phone_exist, is_username_exist, register, send_captcha } from '../../../services/user'
import { message } from 'antd'
import { history as router } from 'umi'
import { globalConstant } from '@/utils/utils'

const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
    username: {
      value: '',
    },
    phone: {
      value: '',
    },

    usernameValidateStatus: 'error',
    phoneValidateStatus: "empty"

  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload)
      if (response.message === 'Successfully registered!') {
        // 保存token 设置登录状态
        localStorage.setItem('token', response.data.Authorization)
        localStorage.setItem('skuVisibleColumns', globalConstant.skuVisibleColumns)
        localStorage.setItem('warehouseRecordVisibleColumns', globalConstant.warehouseRecordVisibleColumns)

        // 提示成功 跳转页面
        message.success('注册成功！')
        router.push({
          pathname: '/',
        })
      }
    },

    *validateUsername({ payload }, { call, put }) {
      const { username } = payload

      // 判断是否手机号
      if (/^\d{11}$/.test(username)) {
        yield put({
          type: 'setUsername',
          payload: {
            username: {
              value: "",
              validateStatus: 'error',
              errorMsg: '帐号必须由字母或数字组成,且不可为11位手机号',
            },
          },
        })
        return
      }

      const response = yield call(is_username_exist, payload)
      if (response.data.is_username_exist) {
        yield put({
          type: 'setUsername',
          payload: {
            username: {
              value: username,
              validateStatus: 'error',
              errorMsg: '用户名已存在',
            },
          },
        })
      } else {
        yield put({
          type: 'setUsername',
          payload: {
            username: {
              value: username,
              validateStatus: 'success',
              errorMsg: null,
            },
          },
        })

      }
    },

    *validatePhone({ payload }, { call, put }) {
      const phone = { payload }
      if (phone) {
        const response = yield call(is_phone_exist, payload)
        if (response.data.is_phone_exist) {
          yield put({
            type: 'save',
            payload: {
              phone: {
                value: phone,
                validateStatus: 'error',
                errorMsg: '手机号已存在',
              },
            },
          })
        } else {
          yield put({
            type: 'save',
            payload: {
              phone: {
                value: phone,
                validateStatus: 'success',
                errorMsg: null,
              },
            },
          })
        }

      }

    },

    *sendCaptcha({ payload }, { call, put }) {
      const response = yield call(send_captcha, payload)
      if (response.status !== 400 && response.status !== 500) {
        message.success('验证码发送成功')
      } else {
        message.error('验证码发送失败')
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

    registerHandle(state, { payload }) {
      return { ...state, status: payload.status }
    },
    setUsername(state, { payload }) {
      return { ...state, username: payload.username }
    },
  },
}
export default Model
