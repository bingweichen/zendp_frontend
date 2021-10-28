import React, { useEffect, useRef } from 'react'

import { Button, Card, Checkbox, Col, Collapse, Form, Input, InputNumber, Row } from 'antd'

import {
  CheckPreviewPage,
  PurchasePreviewPage,
  PurchaseReturnPreviewPage,
  SalePreviewPage,
  SaleReturnPreviewPage,
  TransferPreviewPage,
} from './PrintSettingPreview'
import { modelName } from '../model'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const colStyle = { margin: 10 }

// 用于生成配置框
const print_setting_meta = {
  'purchase': {
    'whole_headers': ['订单编号', '开单员', '单据日期', '仓库', '供应商', '结算账户', '实付金额', '总数量', '总金额', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '数量', '单价', '折扣', '折后价', '折后金额', '备注'],
  },

  'sale': {
    'whole_headers': ['订单编号', '开单员', '单据日期', '仓库', '客户', '结算账户', '实收金额', '总数量', '总金额', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '数量', '单价', '折扣', '折后价', '折后金额', '备注'],
  },

  'purchase_return': {
    'whole_headers': ['订单编号', '开单员', '单据日期', '仓库', '供应商', '结算账户', '实收金额', '总数量', '总金额', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '数量', '单价', '折扣', '折后价', '折后金额', '备注'],
  },

  'sale_return': {
    'whole_headers': ['订单编号', '开单员', '单据日期', '仓库', '客户', '结算账户', '实付金额', '总数量', '总金额', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '数量', '单价', '折扣', '折后价', '折后金额', '备注'],
  },

  'check': {
    'whole_headers': ['订单编号', '开单员', '创建时间', '仓库', '总盈亏金额', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '盘点前数量', '盘点数量', '盈亏金额', '备注'],
  },

  'transfer': {
    'whole_headers': ['订单编号', '开单员', '创建时间', '调出仓库', '调入仓库', '总调拨数量', '备注'],

    'whole_columns': ['序号', '商品名称', '货号', '调出数量', '备注'],
  },

}

export const CombineForm = props => {
  const formRef = useRef()
  const { selfModel, dispatch, userModel } = props
  const { print_setting } = selfModel
  const { currentUser: selectedUser } = userModel

  const {
    company_name, footer, a4_print_num_of_line, two_print_num_of_line, three_print_num_of_line,
    purchase_visible_columns, purchase_visible_headers,
    sale_visible_headers, sale_visible_columns,
    purchase_return_visible_headers, purchase_return_visible_columns,
    sale_return_visible_headers, sale_return_visible_columns,
    check_visible_headers, check_visible_columns,
    transfer_visible_headers, transfer_visible_columns,
  } = print_setting

  useEffect(() => {
    dispatch({
      type: `${modelName}/getPrintSetting`,
    })
  }, [])

  useEffect(() => {
    formRef.current.setFieldsValue({
      company_name: company_name,
      footer: footer,
      a4_print_num_of_line,
      two_print_num_of_line,
      three_print_num_of_line,

      purchase_visible_columns, purchase_visible_headers,
      sale_visible_headers, sale_visible_columns,
      purchase_return_visible_headers, purchase_return_visible_columns,
      sale_return_visible_headers, sale_return_visible_columns,
      check_visible_headers, check_visible_columns,
      transfer_visible_headers, transfer_visible_columns,
    })

  }, [print_setting])

  async function onFinish(values) {
    dispatch({
      type: `user/updateUserSetting`,
      payload: {
        id: selectedUser.id,
        print_setting: values,
      },
    })

  }

  return (
    <Form
      {...layout}
      name="CombineForm"
      ref={formRef}
      onFinish={onFinish}

      onValuesChange={(value) => {
        dispatch({
          type: `${modelName}/savePrintSetting`,
          payload: {
            ...value,
          },
        })
      }}
    >
      <Form.Item name="company_name" label="公司名称">
        <Input style={{ width: 300 }} placeholder="请填写公司名称"/>
      </Form.Item>

      <div style={{display: "flex", flexDirection: 'column'}}>
        <Form.Item name="footer" label="底部页脚文字">
          <Input.TextArea rows={6} showCount maxLength={500} style={{ width: 700 }}
                          placeholder="
                         公司简介：填写你公司的简介 &#13;
                         主营业务：填写你公司的主营业务 &#13;
                         联系地址：填写你公司的联系地址 &#13;
                         联系电话：填写你公司的联系电话 &#13;
                         收款卡号：填写你公司的收款卡号及对应银行"/>

        </Form.Item>

        <Button style={{ alignSelf: 'center' }} onClick={()=>{
          let footer = "公司简介：填写你公司的简介   " +
            "主营业务：填写你公司的主营业务 \n" +
            "联系地址：填写你公司的联系地址   " +
            "联系电话：填写你公司的联系电话   " +
            "收款卡号：填写你公司的收款卡号及对应银行"
          formRef.current.setFieldsValue({
            footer
          })

          dispatch({
            type: `${modelName}/savePrintSetting`,
            payload: {
              footer,
            },
          })
        }}>
          填入模板
        </Button>
      </div>


      <Form.Item
        label="A4打印每页行数"
        name="a4_print_num_of_line"
        tooltip='预览页面将采用A4打印每页行数'
      >
        <InputNumber/>
      </Form.Item>

      <Form.Item
        label="二分页打印每页行数"
        name="two_print_num_of_line"
      >
        <InputNumber/>
      </Form.Item>

      <Form.Item
        label="三分页打印每页行数"
        name="three_print_num_of_line"
      >
        <InputNumber/>
      </Form.Item>


      <Collapse
        defaultActiveKey={['2']}
      >
        {/* 采购单 */}
        <Collapse.Panel header="采购单配置" key="1" forceRender={true}>
          <Form.Item name="purchase_visible_headers">
            <Checkbox.Group>
              <Card title="采购单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.purchase.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="purchase_visible_columns">
            <Checkbox.Group>
              <Card title="采购单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.purchase.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="采购单预览" key="2">
          <PurchasePreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

        {/* 销售单 */}
        <Collapse.Panel header="销售单配置" key="3" forceRender={true}>
          <Form.Item name="sale_visible_headers">
            <Checkbox.Group>
              <Card title="销售单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.sale.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="sale_visible_columns">
            <Checkbox.Group>
              <Card title="销售单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.sale.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="销售单预览" key="4">
          <SalePreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

        {/* 采购退货单 */}
        <Collapse.Panel header="采购退货单配置" key="5" forceRender={true}>
          <Form.Item name="purchase_return_visible_headers">
            <Checkbox.Group>
              <Card title="采购退货单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.purchase_return.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="purchase_return_visible_columns">
            <Checkbox.Group>
              <Card title="采购退货单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.purchase_return.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="采购退货单预览" key="6">
          <PurchaseReturnPreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

        {/* 销售退货单 */}
        <Collapse.Panel header="销售退货单配置" key="7" forceRender={true}>
          <Form.Item name="sale_return_visible_headers">
            <Checkbox.Group>
              <Card title="销售退货单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.sale_return.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="sale_return_visible_columns">
            <Checkbox.Group>
              <Card title="销售退货单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.sale_return.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="销售退货单预览" key="8">
          <SaleReturnPreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

        {/* 盘点单 */}
        <Collapse.Panel header="盘点单配置" key="9" forceRender={true}>
          <Form.Item name="check_visible_headers">
            <Checkbox.Group>
              <Card title="盘点单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.check.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="check_visible_columns">
            <Checkbox.Group>
              <Card title="盘点单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.check.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="盘点单预览" key="10">
          <CheckPreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

        {/* 调拨单 */}
        <Collapse.Panel header="调拨单配置" key="11" forceRender={true}>
          <Form.Item name="transfer_visible_headers">
            <Checkbox.Group>
              <Card title="调拨单单据信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.transfer.whole_headers.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="transfer_visible_columns">
            <Checkbox.Group>
              <Card title="调拨单商品信息" bordered={false}>
                <Row>
                  {
                    print_setting_meta.transfer.whole_columns.map(ele => {
                      return (
                        <Col key={ele} style={colStyle}>
                          <Checkbox value={ele}>{ele}</Checkbox>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Card>
            </Checkbox.Group>
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel header="调拨单预览" key="12">
          <TransferPreviewPage print_setting={print_setting}/>
        </Collapse.Panel>

      </Collapse>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
          保存
        </Button>
      </Form.Item>

    </Form>
  )
}
