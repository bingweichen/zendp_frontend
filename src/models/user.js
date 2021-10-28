import { get_current_user, update_user } from '../services/user'
import { message } from 'antd/lib/index'

export const modelName = 'user'

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    isLogin: false,


  },
  effects: {
    // 获取当前用户信息
    *fetchCurrent(_, { call, put }) {

      const response = yield call(get_current_user)
      if (response.message === 'get current_user successfully') {
        let currentUser = {
          name: response.data.username || response.data.nickname,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: response.data.id,
          ...response.data,
        }

        yield put({
          type: 'save',
          payload: {
            currentUser,
            isLogin: true,
          },
        })

        // 测试修改权限
        const loginStatus = {
          status: 'ok',
          type: 'account',
          // currentAuthority: response.data.permissions_array,
        }

        yield put({
          type: 'login/changeLoginStatus',
          payload: { ...loginStatus },
        })

      } else {
        if (response.status === 401) {
          yield put({
            type: 'save',
            payload: {
              isLogin: false,
            },
          })
          localStorage.setItem('token', '')
        }
      }
    },

    // 个人设置页面使用
    *updateUserSetting({ payload }, { call, put, select }) {
      const hide = message.loading('正在保存')
      const response = yield call(update_user, payload)
      hide()
      if (response.status !== 400 && response.status !== 500) {
        message.success('保存成功')
        yield put({
          type: 'fetchCurrent',
        })
      }
    },

  },
  reducers: {
    save(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },

  },
}
export default UserModel
