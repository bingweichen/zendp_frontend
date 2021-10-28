import { message } from 'antd'
import { add_object, get_object, update_object } from '../../services/object'

import { add_comment, get_comments } from '../../services/comment'

import { history } from 'umi'
import {globalConstant} from '../../utils/utils'
export const modelName = 'object'

const Model = {
  namespace: modelName,
  state: {
    // 当前页
    selectedEle: {},
    comments: [],

    // 频率模态框
    isModalVisible: false

  },
  effects: {
    // 创建条目
    *submitCreate({ payload }, { call, put, select }) {
      const hide = message.loading('正在创建')
      const response = yield call(add_object, payload)
      hide()
      if (response.status !== 400) {
        message.success('创建成功')

        // 根据category_id 选择合适的版块跳转
        let urlHeader = globalConstant.categoryName2urlMapping[response.data.category.name]

        // 跳转到详情页面

        history.push(`${urlHeader}/objects/${response.data.id}`)
      }
    },

    // 更新条目
    *submitUpdate({ payload }, { call, put, select }) {
      const hide = message.loading('正在更新')
      const response = yield call(update_object, payload)
      hide()
      if (response.status !== 400) {
        message.success('更新成功')
        history.goBack()

        // 跳转到详情页面
        // history.push(`/objects/${response.data.id}`)
      }
    },

    // 获取条目
    *getObject({ payload }, { call, put, select }) {
      const response = yield call(get_object, payload)
      if (response.status !== 400) {
        yield put({
          type: 'save',
          payload: {
            selectedEle: response.data,
          },
        })

        yield put.resolve({
          type: 'getCurrentComments',
        })
      }
    },

    // 获取当前页面评论列表
    *getCurrentComments({ payload }, { call, put, select }) {

      let selectedEle = yield select((state) => state[modelName].selectedEle)
      console.log('selectedEle', selectedEle)
      yield put.resolve({
        type: 'getComments',
        payload: {
          object_id: selectedEle.id
        }
      })

    },

    // 获取评论列表
    *getComments({ payload }, { call, put, select }) {
      const response = yield call(get_comments, payload)
      if (response.status !== 400) {
        yield put({
          type: 'save',
          payload: {
            comments: response.data.items,
          },
        })
      }
    },

    // 提交评论
    *submitComment({ payload }, { call, put, select }) {
      const { objectId, rate, desc } = payload

      const response = yield call(add_comment, {
        object_id: objectId,
        rate,
        desc,
      })

      if (response.status !== 400) {
        // 重新获取评论
        yield put({
          type: 'getCurrentComments',
        })

        // 清空表单 or 关闭弹窗

        yield put({
          type: 'save',
          payload: {
            isModalVisible: false
          }
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
export default Model
