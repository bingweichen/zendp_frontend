import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import DraggableModal from '../../components/DraggableModal'
import SelectImageList from '../../components/ImagePage/ImageList'
import ImageSearchBar from '../../components/ImagePage/SearchBar'
import { globalConstant } from '../../utils/utils'

export const ImageFormItemGroup = (props) => {

  const { label, name, formRef, dispatch } = props

  useEffect(() => {
    setImageUrl(props.image_url)
  }, [props.image_url])

  let [isImageModalVisible, setVisible] = useState(false)
  let [image_url, setImageUrl] = useState('')

  return <>
    <Form.Item label={label} name={name}>
      <Input maxLength={500}
        // defaultValue={image_url}
             onBlur={(e) => {
               setImageUrl(e.target.value)
             }}
             onPressEnter={(e) => e.target.blur()}
             placeholder="请填写商品图片的地址"
      />
    </Form.Item>

    <Form.Item label="图片预览">
      <Space>
        <Image
          width={200}
          src={image_url}
          fallback={globalConstant.defaultImageSrc}
        />
        <Button type="primary" onClick={
          () => setVisible(true)}>
          从相册选择
        </Button>
      </Space>

      <DraggableModal
        width={1200}
        title={`选择${label}图片`}
        visible={isImageModalVisible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ImageSearchBar dispatch={dispatch} onlyActive={true}/>

          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              let win = window.open(`/setting/product/imagePage`, '_blank')
              win.focus()

            }}>
            添加图片
          </Button>
        </div>


        <SelectImageList setImageUrlFunc={(imageUrl) => {
          setImageUrl(imageUrl)

          formRef.current.setFieldsValue({
            [name]: imageUrl,
          })
          setVisible(false)
        }}/>
      </DraggableModal>
    </Form.Item>
  </>
}
