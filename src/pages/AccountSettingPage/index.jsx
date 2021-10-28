import React, { useState } from 'react'
import { connect } from 'dva'
import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { GridContent } from '@ant-design/pro-layout'
import { modelName } from './model'
import styles from './style.less'
import { Menu } from 'antd'
import {
  // UpdateCompanyForm,
  // UpdateCompanySettingForm,
  UpdateUserForm,
  // UpdateUserSettingForm,
  // CompanyCouponForm
} from './components/CustomForm'
import Authorized from '@/utils/Authorized'
import { NoMatch } from '../../components/NoMatch'
// import PrintSettingPage from './components/PrintSettingPage'

const { Item } = Menu

const menuMap = {
  user: '个人信息',
  // userSetting: '个人配置',
  // company: '公司信息',
  // companySetting: '公司配置',
  // printSetting: '打印配置',
  // companyCoupon: '会员兑换'
}

const AccountPage = (props) => {
  const { selfModel, dispatch, loading, userModel } = props

  const [selectKey, setSelectKey] = useState('user')

  const renderChildren = () => {
    switch (selectKey) {
      case 'user':
        return <div className={styles.left}>
            <UpdateUserForm userModel={userModel} dispatch={dispatch} selfModel={selfModel}/>
          </div>
      // case 'userSetting':
      //   return Authorized.check('USER_SETTING',
      //     <div className={styles.left}><UpdateUserSettingForm userModel={userModel} dispatch={dispatch}/></div>,
      //     NoMatch(),
      //   )
      //
      // case 'company':
      //   return Authorized.check('SYSTEM_SETTING',
      //     <div className={styles.left}><UpdateCompanyForm userModel={userModel} dispatch={dispatch}/></div>,
      //     NoMatch(),
      //   )
      //
      // case 'companySetting':
      //   return Authorized.check('SYSTEM_SETTING',
      //     <div className={styles.left}><UpdateCompanySettingForm userModel={userModel} dispatch={dispatch}/></div>,
      //     NoMatch(),
      //   )
      // case 'printSetting':
      //   return Authorized.check('SYSTEM_SETTING',
      //     <div><PrintSettingPage selfModel={selfModel} dispatch={dispatch} userModel={userModel}/></div>,
      //     NoMatch(),
      //   )
      // case 'companyCoupon':
      //   return <div className={styles.left}><CompanyCouponForm selfModel={selfModel} dispatch={dispatch} userModel={userModel}/></div>
      default:
        break
    }
    return null
  }

  return (
    <GridContent>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu selectedKeys={[selectKey]} onClick={({ key }) => setSelectKey(key)}
                mode={'inline'}>
            {
              Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>)
            }
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  )
}

export default connect(({ [modelName]: selfModel, user, loading }) => ({
  selfModel,
  userModel: user,
  loading: loading.effects[`${modelName}/getDataSource`],
}))(AccountPage)


