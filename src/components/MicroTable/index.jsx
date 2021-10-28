// 与服务端交互的表格
import React, {useEffect} from 'react'
import { Table } from 'antd'

const MicroTable = (props) => {
  const {
    selfModel, dispatch, modelName,
    dataSource, columns,
    ...tableProps} = props
  const { pageNum, pageSize, total } = selfModel

  useEffect(() => {
    return ()=> {
      dispatch({
        type: `${modelName}/init`,
      })
    }
  }, [])


  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => `共${total}条`,
    pageSize: pageSize,
    current: pageNum,
    total: total,
  }

  const onChange = (pagination, filters, sorter, extra) => {

    const converter = {
      'ascend': 'asc',
      'descend': 'desc',
    }

    dispatch({
      type: `${modelName}/handleOnChangeTable`,
      payload: {
        sorted_by: sorter.order && sorter.field,
        sorted_by_type: converter[sorter.order],
        pageNum: pagination.current
      }
    })
  }

  return <Table
    dataSource={dataSource}
    columns={columns}
    pagination={paginationProps}
    onChange={onChange}
    {...tableProps}
  />
}

export default MicroTable;
