import { stringify } from 'querystring'
import { history as router } from 'umi'

// import { fakeAccountLogin } from '@/services/login'
import { setAuthority } from '@/utils/authority'
import { getPageQuery, globalConstant } from '@/utils/utils'

import { get_current_user, login, logout } from '../services/user'

const Model = {
  namespace: 'login',
  state: {
    status: undefined,


    currentUser: {}
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload)
      const loginStatus = {}
      if (response.message === 'Successfully logged in') {
        loginStatus.status = 'ok'
        loginStatus.type = 'account'
        loginStatus.currentAuthority = response.data.permissions_array
        // token
        localStorage.setItem('token', response.data.Authorization)

      } else {
        loginStatus.status = 'error'
        loginStatus.type = 'account'
        loginStatus.currentAuthority = 'guest'
      }

      yield put({
        type: 'changeLoginStatus',
        payload: { ...loginStatus },
      }) // Login successfully

      if (response.message === 'Successfully logged in') {
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        let { redirect } = params

        if (redirect) {
          const redirectUrlParams = new URL(redirect)

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            window.location.href = '/'
            return
          }
        }

        yield put({
          type: 'user/save',
          payload: {
            isLogin: true,
          },
        })

        router.replace(redirect || '/')
      }
    },

    *logout(_, { call, put }) {
      const { redirect } = getPageQuery() // Note: There may be security issues, please note

      // 向后端发起退出登录
      const response = yield call(logout)

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            // redirect: window.location.href,
          }),
        })
      }
      yield put({
        type: 'user/save',
        payload: {
          isLogin: false,
        },
      })

      localStorage.setItem('token', '')
    },


  },
  reducers: {
    save(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },

    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return { ...state, status: payload.status, type: payload.type }
    },
  },
}
export default Model
