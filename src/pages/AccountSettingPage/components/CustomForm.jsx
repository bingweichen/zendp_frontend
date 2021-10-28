import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Collapse } from 'antd'
import { CommonForm } from '../../../components/user/FormItems'
import { UpdatePhoneModalButton } from '../../../components/user/UpdatePhoneModalButton'
import { UsernameFormItem } from '../../../components/FormItem/UserName'

// import { formatDatetime, generate_sn_str } from '../../../utils/utils'
import { ResetPasswordModalButton } from '../../../components/user/ResetPasswordModalButton'
import { message } from 'antd/lib/index'
// import EditableTagGroup from '../../../components/TagGroup'
import { ImageFormItemGroup } from '../../../components/ImagePage/ImageFormItemGroup'
// import MicroTable from '../../../components/MicroTable'
import styles from '../../styles.less'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const UpdateUserForm = props => {
  const { userModel, dispatch } = props
  const { currentUser: selectedUser } = userModel

  const [usernameValidateStatus, setUsernameValidateStatus] = useState('success')

  const formRef = useRef()
  useEffect(() => {
    formRef.current.setFieldsValue({
      username: selectedUser.username,
      phone: selectedUser.phone,
      nickname: selectedUser.nickname,
      is_active: selectedUser.is_active,
      identity: selectedUser.identity,
      email: selectedUser.email,
      join_date: selectedUser.join_date
        ? formatDate(selectedUser.join_date) : null,
      notes: selectedUser.notes,
    })
  }, [selectedUser])

  async function onFinish(values) {
    // 自定义检查
    if (usernameValidateStatus !== 'success') {
      message.error('用户名填写错误')
      return
    }

    let userFormInfo = {
      ...values,
    }

    delete userFormInfo.phone

    userFormInfo.join_date = userFormInfo.join_date && values.join_date.format('YYYY-MM-DD')
    dispatch({
      type: 'user/updateUserSetting',
      payload: {
        id: selectedUser.id,
        ...userFormInfo,
      },
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  let commonForm = CommonForm({})

  return (
    <>
      <Form
        {...layout}
        name="UpdateUserForm"
        ref={formRef}
        initialValues={{ is_active: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <UsernameFormItem
          setValidateStatusFunc={(value) => {
            setUsernameValidateStatus(value)
          }}
          label={'用户名'}
          InputSize="middle"
        />

        <Form.Item
          label="手机号"
          name="phone"
        >
          <Input
            disabled
            placeholder="请填写手机号"
            addonAfter={<UpdatePhoneModalButton
              user_id={selectedUser.id}
              dispatch={dispatch}
              updateFunc={() => {
                dispatch({
                  type: 'user/fetchCurrent',
                })
              }}
            />}/>
        </Form.Item>

        {commonForm}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
            保存
          </Button>
          <ResetPasswordModalButton
            user_id={selectedUser.id}
          />
        </Form.Item>
      </Form>
    </>
  )
}

// export const UpdateUserSettingForm = props => {
//   const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   }
//
//   const { userModel, dispatch } = props
//   const { currentUser: selectedUser } = userModel
//   const formRef = useRef()
//   useEffect(() => {
//     formRef.current.setFieldsValue({
//       a4_print_num_of_line: selectedUser.a4_print_num_of_line,
//       two_print_num_of_line: selectedUser.two_print_num_of_line,
//       three_print_num_of_line: selectedUser.three_print_num_of_line,
//       precision: selectedUser.precision,
//
//     })
//   }, [selectedUser])
//
//   async function onFinish(values) {
//     let userFormInfo = {
//       ...values,
//     }
//     dispatch({
//       type: 'user/updateUserSetting',
//       payload: {
//         id: selectedUser.id,
//         ...userFormInfo,
//       },
//     })
//   }
//
//   const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo)
//   }
//
//   return (
//     <Form
//       {...layout}
//       name="UpdateUserForm"
//       ref={formRef}
//       initialValues={{ is_active: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <Form.Item
//         label="价格显示位数"
//         name="precision"
//       >
//         <Select>
//           <Option key={`UpdateUserForm-precision-option-1`} value={1}>
//             1
//           </Option>
//           <Option key={`UpdateUserForm-precision-option-2`} value={2}>
//             2
//           </Option>
//           <Option key={`UpdateUserForm-precision-option-3`} value={3}>
//             3
//           </Option>
//           <Option key={`UpdateUserForm-precision-option-3`} value={3}>
//             4
//           </Option>
//         </Select>
//       </Form.Item>
//
//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
//           保存
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }
//
// export const UpdateCompanyForm = (props) => {
//   const { userModel, dispatch } = props
//   const { currentUser } = userModel
//   const { company } = currentUser
//   const formRef = useRef()
//   const tagsRef = useRef()
//
//   useEffect(() => {
//     formRef.current.setFieldsValue({
//       name: company.name,
//       address: company.address,
//       phone: company.phone,
//       notes: company.notes,
//
//       avatar: company.avatar,
//       home_img: company.home_img,
//       desc: company.desc,
//       is_active: company.is_active,
//     })
//   }, [company])
//
//   async function onFinish(values) {
//     let userFormInfo = {
//       ...values,
//       tags: tagsRef.current.state.tags,
//     }
//     dispatch({
//       type: 'user/updateCompany',
//       payload: {
//         id: company.id,
//         ...userFormInfo,
//       },
//     })
//   }
//
//   return (
//     <>
//       <Form
//         {...layout}
//         name="UpdateCompanyForm"
//         ref={formRef}
//         onFinish={onFinish}
//       >
//
//         <Form.Item
//           label="公司名称"
//           name="name"
//         >
//           <Input maxLength={50} placeholder='公司名称'/>
//         </Form.Item>
//
//         <Form.Item
//           label="公司地址"
//           name="address"
//         >
//           <Input maxLength={50} placeholder='公司地址'/>
//         </Form.Item>
//
//         <Form.Item
//           label="手机号"
//           name="phone"
//         >
//           <Input maxLength={50} placeholder='手机号'/>
//         </Form.Item>
//
//         <Form.Item
//           label="公司描述"
//           name="desc"
//         >
//           <Input maxLength={50} placeholder='公司描述'/>
//         </Form.Item>
//
//         <Form.Item
//           label="标签"
//           name="tags"
//         >
//           <EditableTagGroup tags={company.tags ? company.tags : []} ref={tagsRef}/>
//
//         </Form.Item>
//
//         <Form.Item
//           label="备注"
//           name="notes"
//         >
//           <Input.TextArea showCount maxLength={500} placeholder='备注'/>
//         </Form.Item>
//
//         <Form.Item label="是否在圈子展示主页" name="is_active">
//           <Select>
//             <Option key={`SkuForm-is_active-option-1`} value={true}>
//               启用
//             </Option>
//             <Option key={`SkuForm-is_active-option-2`} value={false}>
//               无效
//             </Option>
//           </Select>
//         </Form.Item>
//
//
//         <ImageFormItemGroup label='头像' name='avatar' image_url={company.avatar}
//                             formRef={formRef} dispatch={dispatch}
//         />
//         <ImageFormItemGroup label='首图' name='home_img' image_url={company.home_img}
//                             formRef={formRef} dispatch={dispatch}/>
//
//
//         <Form.Item {...tailLayout}>
//           <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
//             保存
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   )
//
// }
//
// export const UpdateCompanySettingForm = (props) => {
//   const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   }
//
//   const { userModel, dispatch } = props
//   const { currentUser } = userModel
//   const { company } = currentUser
//   const formRef = useRef()
//
//   let [auto_sku_sn_is_active, set_auto_sku_sn_is_active] = useState(true)
//
//   useEffect(() => {
//     formRef.current.setFieldsValue({
//       auto_sku_sn_is_active: company.auto_sku_sn_is_active,
//       auto_sku_sn_prefix: company.auto_sku_sn_prefix,
//       auto_sku_sn_start_index: company.auto_sku_sn_start_index,
//       auto_sku_sn_len: company.auto_sku_sn_len,
//     })
//
//     set_auto_sku_sn_is_active(company.auto_sku_sn_is_active)
//   }, [company])
//
//   async function onFinish(values) {
//     let userFormInfo = {
//       ...values,
//     }
//     dispatch({
//       type: 'user/updateCompany',
//       payload: {
//         id: company.id,
//         ...userFormInfo,
//       },
//     })
//   }
//
//   // // 放置一个货号预览
//   // let values = formRef.current.validateFields()
//
//   return (
//     <Form
//       {...layout}
//       name="UpdateCompanySettingForm"
//       ref={formRef}
//       onFinish={onFinish}
//     >
//
//       <Form.Item
//         label="自动货号是否开启"
//         name="auto_sku_sn_is_active"
//         // help={'启用后，新增商品时将自动生成货号。 示例：1110000001'}
//       >
//         <Select onChange={value => set_auto_sku_sn_is_active(value)}>
//           <Option key={`CommonForm-is_active-option-1`} value={true}>
//             启用
//           </Option>
//           <Option key={`CommonForm-is_active-option-2`} value={false}>
//             无效
//           </Option>
//         </Select>
//       </Form.Item>
//
//       {
//         auto_sku_sn_is_active && <Form.Item
//           label="自动货号前缀"
//           name="auto_sku_sn_prefix"
//         >
//           <Input/>
//         </Form.Item>
//       }
//
//       {
//         auto_sku_sn_is_active && <Form.Item
//           label="自动货号当前起始位置"
//           name="auto_sku_sn_start_index"
//         >
//           <InputNumber/>
//         </Form.Item>
//
//       }
//
//       {
//         auto_sku_sn_is_active && <Form.Item
//           label="自动货号数字长度"
//           name="auto_sku_sn_len"
//         >
//           <InputNumber/>
//         </Form.Item>
//
//       }
//
//       {
//         auto_sku_sn_is_active && <Form.Item
//           label="货号示例"
//           shouldUpdate={(prevValues, curValues) =>
//             prevValues.auto_sku_sn_start_index !== curValues.auto_sku_sn_start_index ||
//             prevValues.auto_sku_sn_prefix !== curValues.auto_sku_sn_prefix ||
//             prevValues.auto_sku_sn_len !== curValues.auto_sku_sn_len
//           }
//         >
//           {({ getFieldValue }) => {
//             const auto_sku_sn_start_index = getFieldValue('auto_sku_sn_start_index')
//             const auto_sku_sn_prefix = getFieldValue('auto_sku_sn_prefix')
//             const auto_sku_sn_len = getFieldValue('auto_sku_sn_len')
//
//             return auto_sku_sn_prefix + generate_sn_str(auto_sku_sn_start_index, auto_sku_sn_len)
//           }}
//         </Form.Item>
//       }
//
//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
//           保存
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }
//
// export const CompanyCouponForm = (props) => {
//   const { userModel, dispatch, selfModel } = props
//   const { currentUser } = userModel
//   const { company } = currentUser
//   const { expired_datetime } = company
//
//   const formRef = useRef()
//
//   async function onFinish(values) {
//
//     dispatch({
//       type: 'accountSetting/verifyCode',
//       payload: {
//         ...values,
//       },
//     })
//   }
//
//   return (
//     <Form
//       {...layout}
//       name="CompanyCouponForm"
//       ref={formRef}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         label="会员有效期"
//         // name="expired_datetime"
//       >
//         {formatDatetime(expired_datetime, 'year')}
//       </Form.Item>
//
//       <Form.Item
//         label="兑换码"
//         name="coupon_code"
//       >
//         <Input maxLength={50} placeholder='兑换码'/>
//       </Form.Item>
//
//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
//           提交
//         </Button>
//       </Form.Item>
//
//       <Collapse
//         defaultActiveKey={[]}
//       >
//         <Collapse.Panel header="兑换记录" key="1" forceRender={true}>
//
//           <VerifiedCouponList selfModel={selfModel} dispatch={dispatch} modelName='accountSetting' />
//
//         </Collapse.Panel>
//       </Collapse>
//
//     </Form>
//   )
// }
//
// const VerifiedCouponList = (props) => {
//   const { selfModel, dispatch, modelName } = props
//   const { dataSource } = selfModel
//
//   useEffect(() => {
//     dispatch({
//       type: `${modelName}/initAndGetList`,
//     })
//   }, [])
//
//   const columns = [
//     {
//       title: '兑换码',
//       dataIndex: 'code',
//     },
//     {
//       title: '兑换时间',
//       dataIndex: 'update_datetime',
//       render: (text, record) => {
//         return formatDatetime(text, 'year')
//       },
//     },
//     {
//       title: '会员时长',
//       dataIndex: 'add_days',
//       render: (text, record) => {
//         return `${text}天`
//       }
//     }
//   ]
//
//   return <MicroTable
//     dataSource={dataSource}
//     columns={columns}
//     className={styles.small_table}
//
//     modelName={modelName}
//     selfModel={selfModel}
//     dispatch={dispatch}
//     pagination={false}
//   />
// }


