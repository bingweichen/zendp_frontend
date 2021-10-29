import React from 'react'
import { List } from 'antd'


export const ObjectsPaginationList = (props) => {

  const { objectsModel, dispatch, ...listProps } = props
  const { objects, pageNum, pageSize, total } = objectsModel

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => `共${total}条`,
    pageSize: pageSize,
    current: pageNum,
    total: total,

    onChange: page => {
      dispatch({
        type: 'objects/handleChangePageNum',
        payload: {
          pageNum: page,
        },
      })

    },
  }

  return <List
    {...listProps}
    dataSource={objects}
    pagination={paginationProps}
  />
}

export const CommentsPaginationList = (props) => {

  const { objectModel, dispatch, ...listProps } = props
  const { comments, pageNum, pageSize, total } = objectModel

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => `共${total}条`,
    pageSize: pageSize,
    current: pageNum,
    total: total,

    onChange: page => {
      dispatch({
        type: 'object/handleChangePageNum',
        payload: {
          pageNum: page,
        },
      })

    },
  }

  return <List
    {...listProps}
    dataSource={comments}
    pagination={paginationProps}
  />
}


