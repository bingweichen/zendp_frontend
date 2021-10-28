// 想做成通用的model 还未使用，以后再安排
import { get_user_setting } from '../../services/user'
// import { verify_coupon, get_verify_list } from '../../services/company'
import {message} from 'antd'
export const modelName = 'accountSetting'

const Model = {
  namespace: 'accountSetting',
  state: {
    isResetPasswordModalVisible: false,

    // 打印配置
    print_setting: {},

    dataSource: []

  },
  effects: {
    *getPrintSetting({ payload }, { call, put, select }) {
      const response = yield call(get_user_setting)
      if (!response.status) {
        yield put({
          type: 'save',
          payload: {
            print_setting: response.data.print_setting,
          },
        })
      }
    },

    // verify_code
    *verifyCode({ payload }, { call, put, select }) {
      const response = yield call(verify_coupon, payload)
      if (!response.status) {
        message.success('兑换成功')
        yield put({
          type: 'user/fetchCurrent',
        })

        yield put({
          type: 'initAndGetList'
        })
      }
    },

    *initAndGetList({ payload }, { call, put, select }) {
      const response = yield call(get_verify_list)
      if (!response.status) {
        let dataSource = response.data
        dataSource = dataSource.map(ele => {
          return { 'key': ele.id, ...ele }
        })

        yield put({
          type: 'save',
          payload: {
            dataSource,
          },
        })
      }
    }



  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    // saveWarehouseRecords(state, action) {
    //   return {
    //     ...state,
    //     warehouseRecords: action.payload,
    //   }
    // },
    //
    savePrintSetting(state, action) {
      return {
        ...state,
        print_setting: {
          ...state.print_setting,
          ...action.payload,
        },
      }
    },
  },

}
export default Model
