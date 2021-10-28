import { Button, Form, Select } from 'antd'

import { modelName } from '../model'

const SearchBar = (props) => {
  const { dispatch } = props

  async function onFinish(values) {
    let searchFormInfo = {}
    if (values['is_active'] && values['is_active'] !== 'all') {
      searchFormInfo['is_active'] = values['is_active']
    }
    // 设置参数，重新获取列表
    dispatch({
      type: `${modelName}/search`,
      payload: { searchFormInfo },
    })
  }

  return (
    <Form
      layout="inline"
      name="userSearchBar"
      initialValues={{
        is_active: 'all',
      }}
      onFinish={onFinish}
    >
      <Form.Item label="状态" name="is_active">
        <Select>
          <Select.Option key={`sku-is_active-option-0`} value={'all'}>
            全部
          </Select.Option>
          <Select.Option key={`sku-is_active-option-1`} value={'true'}>
            启用
          </Select.Option>
          <Select.Option key={`sku-is_active-option-2`} value={'false'}>
            无效
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SearchBar


