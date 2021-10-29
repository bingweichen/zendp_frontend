/**
 * 逻辑：
 *
 * 1. 获取第一页
 * 2. 点击分页 更新分页字段， 获取
 *
 *
 */

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
    isModalVisible: false,

    // 评论分页
    pageSize: 2,
    pageNum: 1,
    total: 0,

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
          type: 'firstGetComments',
        })
      }
    },

    // // 获取当前页面评论列表  、、、
    // *getCurrentComments({ payload }, { call, put, select }) {
    //   let selectedEle = yield select((state) => state[modelName].selectedEle)
    //   yield put.resolve({
    //     type: 'getComments',
    //     payload: {
    //       object_id: selectedEle.id
    //     }
    //   })
    // },

    *firstGetComments({ payload }, { call, put, select }) {
      yield put({
        type: 'handleChangePageNum',
        payload: {
          pageNum: 1
        }
      })
    },



    *handleChangePageNum({ payload }, { call, put, select }) {
      const { pageNum } = payload
      yield put({
        type: 'save',
        payload: {
          pageNum
        }
      })

      yield put.resolve({
        type: 'getCommentsUsingState',
      })
    },

    *getCommentsUsingState({ payload }, { call, put, select }) {
      const currentState = yield select(state => state[modelName])
      const {selectedEle, pageSize, pageNum} = currentState

      yield put.resolve({
        type: 'getComments',
        payload: {
          object_id: selectedEle.id,
          current_page: pageNum,
          per_page: pageSize,
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
            total: response.data.total,
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
          type: 'firstGetComments',
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

    // 图片上传成功
    *successUpload({ payload }, { call, put, select }) {
      const { new_image } = payload

      // 更新
      yield put({
        type: 'updateSelectedEle',
        payload: {
          image_url: new_image.url
        }
      })


    }

  },

  reducers: {
    save(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },

    updateSelectedEle(state, action){
      return {
        ...state,
        selectedEle: {
          ...state.selectedEle,
          ...action.payload,
        }

      }
    }
  },
}
export default Model
