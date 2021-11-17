/**
 * 逻辑：
 *
 * 1. 点击搜索 更新搜索字段，页码1 获取
 * 2. 点击类别 更新类别字段，页码1 获取
 * 3. 点击分页 更新分页字段， 获取
 *
 * 4. 初始化  更新搜索字段，更新类别字段 页码1 获取
 *
 *
 */
import { get_objects } from '../services/object'

export const modelName = 'objects'

const ObjectsModel = {
  namespace: modelName,
  state: {
    objects: [],

    // 搜索页面
    search_str: null,
    category_name: '',

    // 分页
    pageSize: 20,
    pageNum: 1,
    total: 0,

  },
  effects: {
    *handelSearch({ payload }, { call, put, select }) {
      const { search_str } = payload
      yield put({
        type: 'save',
        payload: {
          search_str,
          pageNum: 1
        }
      })

      yield put.resolve({
        type: 'getObjectsUsingState',
      })
    },

    *handleChangeCategory({ payload }, { call, put, select }) {
      const { category_name } = payload
      yield put({
        type: 'save',
        payload: {
          category_name,
          pageNum: 1
        }
      })

      yield put.resolve({
        type: 'getObjectsUsingState',
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
        type: 'getObjectsUsingState',
      })
    },

    *handleSearchAndChangeCategory({ payload }, { call, put, select }) {
      const { search_str, category_name } = payload
      yield put({
        type: 'save',
        payload: {
          search_str,
          category_name,
          pageNum: 1
        }
      })

      yield put.resolve({
        type: 'getObjectsUsingState',
      })
    },


    *getObjectsUsingState({ payload }, { call, put, select }) {
      const currentState = yield select(state => state[modelName])
      const {search_str, category_name, pageSize, pageNum} = currentState

      yield put.resolve({
        type: 'getObjects',
        payload: {
          search_str, category_name,
          current_page: pageNum,
          per_page: pageSize,
        }
      })
    },

    *getObjects({ payload }, { call, put, select }) {
      const response = yield call(get_objects, {
        ...payload,
      })
      if (response.status !== 400) {
        yield put({
          type: 'save',
          payload: {
            objects: response.data.items,
            total: response.data.total,
          },
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
export default ObjectsModel
