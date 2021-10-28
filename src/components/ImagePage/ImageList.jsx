import React, { useEffect } from 'react'
import { connect } from 'dva'

import { Button } from 'antd'
import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined, SelectOutlined } from '@ant-design/icons'
import styles from '../../utils/styles.less'
import MicroTable from '../../components/MicroTable'
import { CustomImage } from './CustomImage'

import { formatDatetime } from '../../utils/utils'

const modelName = 'image'

const SelectImageList = (props) => {
  const {
    selfModel,
    dispatch, setImageUrlFunc,
  } = props

  const { dataSource } = selfModel

  useEffect(() => {

    dispatch({
      type: `${modelName}/handleClickSearch`,
      payload: {
        searchFormInfo: {
          is_active: 'true',
        },
      },
    })

  }, [])

  const columns = [
    {
      title: '图片名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: '图片缩略图',
      dataIndex: 'url',
      render: (text, record) => {
        return <CustomImage src={text}/>
      },
    },
    {
      title: '图片地址',
      dataIndex: 'url',
    },
    {
      title: '创建时间',
      dataIndex: 'create_datetime',
      render: (text, record) => {
        return formatDatetime(text)
      },
      sorter: (a, b) => a.create_datetime - b.create_datetime,
    },
    {
      title: '是否启用',
      dataIndex: 'is_active',
      render: (_, record) => {
        return record.is_active ? '启用' : '无效'
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return <Button
          icon={<SelectOutlined/>}
          type="primary"
          onClick={() => {
            setImageUrlFunc(record.url)
            dispatch({
              type: `sku/save`,
              payload: {
                isImageModalVisible: false,
              },
            })
          }}
        >
          选择
        </Button>
      },
      width: '8%',
    },
  ]

  return <MicroTable
    dataSource={dataSource}
    columns={columns}
    className={styles.small_table}
    modelName={modelName}
    selfModel={selfModel}
    dispatch={dispatch}
  />
}

export default connect(({ image, loading }) => ({
  selfModel: image,
  loading: loading.effects['sku/getSkus'],
}))(SelectImageList)

