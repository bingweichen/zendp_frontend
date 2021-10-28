import { Button, Form, Input, Select } from 'antd'
import { history as router } from 'umi'
// import { CustomUpload } from './components/CustomUpload'

const { Option } = Select

const modelName = 'image'
export const getDataSourceTypeStr = `${modelName}/getDataSource`

const SearchBar = (props) => {
  const { dispatch, onlyActive = false } = props

  async function onFinish(values) {
    let searchFormInfo = {}
    if (values['name']) {
      searchFormInfo['name'] = values['name']
    }
    if (values['is_active'] !== 'all') {
      searchFormInfo['is_active'] = values['is_active']
    }
    // 设置参数，重新获取列表
    dispatch({
      type: `${modelName}/handleClickSearch`,
      payload: {
        searchFormInfo,
      },
    })
  }

  return (
    <Form
      layout="inline"
      name="userSearchBar"
      style={{ margin: 10 }}
      initialValues={onlyActive ? { is_active: 'true' } : {
        is_active: 'all',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="图片名称" name="name"
        tooltip='支持模糊匹配，可填写名称. 如搜索`兰州兰泽西`，可填写 `兰泽西`、'
      >
        <Input placeholder="名称"/>
      </Form.Item>

      <Form.Item label="状态" name="is_active" style={onlyActive && { display: 'none' }}>
        <Select>
          <Option key={`image-is_active-option-0`} value={'all'}>
            全部
          </Option>
          <Option key={`image-is_active-option-1`} value={'true'}>
            启用
          </Option>
          <Option key={`image-is_active-option-2`} value={'false'}>
            无效
          </Option>
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


