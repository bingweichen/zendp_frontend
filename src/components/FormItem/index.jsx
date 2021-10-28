import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { is_name_exist } from '../../services/category'
import { is_role_name_exist } from '../../services/user'

import { is_customer_name_exist } from '../../services/customer'
import { is_warehouse_name_exist } from '../../services/warehouse'

import { formatMessage } from 'umi'

export const CategoryNameFormItem = () => {
  let [name, setName] = useState({
    value: '',
  })
  const onNameChange = async (e) => {
    let name = e.target.value
    const response = await is_name_exist({ name })
    if (response.data.is_name_exist) {
      setName({
        value: name,
        validateStatus: 'error',
        errorMsg: '名称已存在',
      })
    } else {
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
    }
  }
  return <Form.Item
    label="类别名称" name="name"
    rules={[{ required: true, message: '请输入类别名称!' }]}
    validateStatus={name.validateStatus}
    help={name.errorMsg}
  >
    <Input onChange={onNameChange} maxLength={50}
           placeholder='名称'
    />
  </Form.Item>
}

// 移动到单独的文件中了
// export const UsernameFormItem = () => {
//   let [name, setName] = useState({
//     value: '',
//   })
//   const onNameChange = async (e) => {
//     let name = e.target.value
//     const response = await is_username_exist({ username: name })
//     if (response.data.is_username_exist) {
//       setName({
//         value: name,
//         validateStatus: 'error',
//         errorMsg: '用户名已存在',
//       })
//     } else {
//       setName({
//         value: name,
//         validateStatus: 'success',
//         errorMsg: null,
//       })
//     }
//   }
//   return <Form.Item
//     label="账号"
//     name="username"
//     rules={[
//       {
//         required: true,
//         message: '请输入用户名',
//       },
//     ]}
//     validateStatus={name.validateStatus}
//     help={name.errorMsg}
//   >
//     <Input onChange={onNameChange}/>
//   </Form.Item>
// }

export const RoleNameFormItem = ({ disabled }) => {
  let [name, setName] = useState({
    value: '',
  })
  const onNameChange = async (e) => {
    let name = e.target.value
    const response = await is_role_name_exist({ name })
    if (response.data.is_role_name_exist) {
      setName({
        value: name,
        validateStatus: 'error',
        errorMsg: '名称已存在',
      })
    } else {
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
    }
  }
  return <Form.Item
    label="角色名称" name="name"
    rules={[{ required: true, message: '请输入角色名称!' }]}
    validateStatus={name.validateStatus}
    help={name.errorMsg}
    labelAlign='left'
  >
    <Input onChange={onNameChange} maxLength={50} disabled={disabled}
           placeholder='请填写角色名称'
           style={{ width: '200px' }}
    />
  </Form.Item>
}

// 客户供应商名称
export const CustomerNameFormItem = (props) => {
  let { label } = props
  let [name, setName] = useState({
    value: '',
  })
  const onNameChange = async (e) => {
    let name = e.target.value
    const response = await is_customer_name_exist({ name })
    if (response.data.is_customer_name_exist) {
      setName({
        value: name,
        validateStatus: 'error',
        errorMsg: '名称已存在',
      })
    } else {
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
    }
  }
  return <Form.Item
    label={label} name="name"
    rules={[{ required: true, message: `请输入${label}!` }]}
    validateStatus={name.validateStatus}
    help={name.errorMsg}
  >
    <Input onChange={onNameChange} maxLength={50}
           placeholder='名称'
    />
  </Form.Item>
}

// 仓库名称
export const WarehouseNameFormItem = (props) => {
  let { label } = props
  let [name, setName] = useState({
    value: '',
  })
  const onNameChange = async (e) => {
    let name = e.target.value
    const response = await is_warehouse_name_exist({ name })
    if (response.data.is_warehouse_name_exist) {
      setName({
        value: name,
        validateStatus: 'error',
        errorMsg: '名称已存在',
      })
    } else {
      setName({
        value: name,
        validateStatus: 'success',
        errorMsg: null,
      })
    }
  }
  return <Form.Item
    label={label} name="name"
    rules={[{ required: true, message: `请输入${label}!` }]}
    validateStatus={name.validateStatus}
    help={name.errorMsg}
  >
    <Input onChange={onNameChange} maxLength={50}
           placeholder='名称'
    />
  </Form.Item>
}

// // 手机号的两种
// // 1. 手机号不存在 (先完成这个)
// // 2. 手机号已经存在
// export const PhoneAndCaptcha = ({}) => {
//   let [name, setName] = useState({
//     value: '',
//   })
//
//   return <>
//     <Form.Item
//       label="手机号" name="phone"
//       rules={[
//         {
//           required: true,
//           message: formatMessage({
//             id: 'userandregister.phone-number.required',
//           }),
//         },
//         {
//           pattern: /^\d{11}$/,
//           message: formatMessage({
//             id: 'userandregister.phone-number.wrong-format',
//           }),
//         },
//       ]}
//
//       validateStatus={name.validateStatus}
//       help={name.errorMsg}
//       labelAlign='left'
//     >
//       <Input
//         maxLength={50}
//         placeholder='请填写手机号'
//         style={{ width: '200px' }}
//         size="large"
//       />
//     </Form.Item>
//
//     <Row gutter={8}>
//       <Col span={16}>
//         <Form.Item
//           name="captcha"
//           rules={[
//             {
//               required: true,
//               message: formatMessage({
//                 id: 'userandregister.verification-code.required',
//               }),
//             },
//           ]}
//         >
//           <Input
//             size="large"
//             placeholder={formatMessage({
//               id: 'userandregister.verification-code.placeholder',
//             })}
//           />
//         </Form.Item>
//       </Col>
//       <Col span={8}>
//         <Button
//           size="large"
//           disabled={!!count}
//           className={styles.getCaptcha}
//           onClick={onGetCaptcha}
//         >
//           {count
//             ? `${count} s`
//             : formatMessage({
//               id: 'userandregister.register.get-verification-code',
//             })}
//         </Button>
//       </Col>
//     </Row>
//   </>
//
// }
//
// export const PhoneFormItem = ({}) => {
//   let [name, setName] = useState({
//     value: '',
//   })
//   const onNameChange = async (e) => {
//     let phone = e.target.value
//     // 如果位数出错 15988731660
//
//     if (phone) {
//       const response = await is_phone_exist({ phone })
//       if (response.data.is_phone_exist) {
//         setName({
//           value: name,
//           validateStatus: 'success',
//           errorMsg: null,
//         })
//       } else {
//         setName({
//           value: name,
//           validateStatus: 'error',
//           errorMsg: '该手机号尚未注册过,请先注册',
//         })
//       }
//     }
//   }
//   return <Form.Item
//     label="手机号" name="phone"
//
//     rules={[
//       {
//         required: true,
//         message: formatMessage({
//           id: 'userandregister.phone-number.required',
//         }),
//       },
//       {
//         pattern: /^\d{11}$/,
//         message: formatMessage({
//           id: 'userandregister.phone-number.wrong-format',
//         }),
//       },
//     ]}
//
//     validateStatus={name.validateStatus}
//     help={name.errorMsg}
//     labelAlign='left'
//   >
//     <Input
//       // onChange={onNameChange}
//       onPressEnter={(e) => {
//         e.target.blur()
//       }}
//       onBlur={onNameChange}
//       maxLength={50}
//       placeholder='请填写手机号'
//       style={{ width: '200px' }}
//       size="large"
//     />
//   </Form.Item>
// }



