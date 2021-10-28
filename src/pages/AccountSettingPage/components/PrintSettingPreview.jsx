import React from 'react'

import { PrintArea as PurchasePrintArea } from '../../PurchaseOrderPage/components/PrintArea'
import { PrintArea as SalePrintArea } from '../../SaleOrderPage/components/PrintArea'
import { PrintArea as PurchaseReturnPrintArea } from '../../PurchaseReturnOrderPage/components/PrintArea'
import { PrintArea as SaleReturnPrintArea } from '../../SaleReturnOrderPage/components/PrintArea'
import { PrintArea as CheckPrintArea } from '../../CheckOrderPage/components/PrintArea'
import { PrintArea as TransferPrintArea } from '../../TransferOrderPage/components/PrintArea'

const mockSelfModel = {
  selectedEle: {
    dataSource: [
      {
        number: 1,
        sku_name: 'DW15-4000A 热电磁',
        sku_sn: '000199',
        num: 1,
        price: 18287.808,
        discount: 1,
      },
      {
        number: 2,
        sku_name: 'DZ47G(CDB5)-100/2P 63A',
        sku_sn: '000103',
        num: 181,
        price: 14.944,
        discount: 1,
      },
      {
        number: 3,
        sku_name: 'DZ47Y -40 2P',
        sku_sn: '000114',
        num: 137,
        price: 101.216,
        discount: 1,
      },
      {
        number: 4,
        sku_name: 'DZ47Y-65 4P',
        sku_sn: '000119',
        num: 1,
        price: 342.856,
        discount: 1,
      },
    ],
    order_sn: 'CG-20210513-000002',
    warehouse: {
      name: '雁滩仓库',
    },
    account: {
      name: '支付宝结算账户',
    },
    customer: {
      name: '中国德力西',
    },
    payment: 12133,
    income: 10000,
    creator: {
      name: '体验账号',
    },
    date: '2021-05-13',
    notes: '测试备注',
  },
}

export const PurchasePreviewPage = (props) => {
  const { print_setting } = props

  return <PurchasePrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}

export const SalePreviewPage = (props) => {
  const { print_setting } = props

  return <SalePrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}

export const PurchaseReturnPreviewPage = (props) => {
  const { print_setting } = props

  return <PurchaseReturnPrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}

export const SaleReturnPreviewPage = (props) => {
  const { print_setting } = props

  return <SaleReturnPrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}

export const CheckPreviewPage = (props) => {

  const { print_setting } = props

  const mockSelfModel = {
    selectedEle: {
      dataSource: [
        {
          number: 1,
          sku_name: 'DW15-4000A 热电磁',
          sku_sn: '000199',
          before_num: 1,
          after_num: 10,
          cost_price: 1000,
        },
        {
          number: 2,
          sku_name: 'DZ47G(CDB5)-100/2P 63A',
          sku_sn: '000103',
          before_num: 1,
          after_num: 10,
          cost_price: 1000,
        },
        {
          number: 3,
          sku_name: 'DZ47Y -40 2P',
          sku_sn: '000114',
          before_num: 1,
          after_num: 10,
          cost_price: 1000,
        },
        {
          number: 4,
          sku_name: 'DZ47Y-65 4P',
          sku_sn: '000119',
          before_num: 1,
          after_num: 10,
          cost_price: 1000,
        },
      ],
      order_sn: 'PD-20210513-000002',
      warehouse: {
        name: '雁滩仓库',
      },
      totalProfitAndLoss: 10000,
      creator: {
        name: '体验账号',
      },
      create_datetime: '2021-05-13',
      notes: '测试备注',
    },
  }
  return <CheckPrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}

export const TransferPreviewPage = (props) => {

  const { print_setting } = props

  const mockSelfModel = {
    selectedEle: {
      dataSource: [
        {
          number: 1,
          sku_name: 'DW15-4000A 热电磁',
          sku_sn: '000199',
          num: 1,

        },
        {
          number: 2,
          sku_name: 'DZ47G(CDB5)-100/2P 63A',
          sku_sn: '000103',
          num: 1,

        },
        {
          number: 3,
          sku_name: 'DZ47Y -40 2P',
          sku_sn: '000114',
          num: 1,

        },
        {
          number: 4,
          sku_name: 'DZ47Y-65 4P',
          sku_sn: '000119',
          num: 1,

        },
      ],
      order_sn: 'PD-20210513-000002',
      creator: {
        name: '体验账号',
      },
      create_datetime: '2021-05-13',

      from_warehouse: {
        name: '雁滩仓库',
      },
      to_warehouse: {
        name: '龙辰门店',
      },
      totalNum: 4,
      notes: '测试备注',
    },
  }
  return <TransferPrintArea
    selfModel={mockSelfModel}
    userModel={
      {
        currentUser: {
          print_setting,
        },
      }
    }
  />
}
