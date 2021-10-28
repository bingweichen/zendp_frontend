import React from 'react'
import { Card, Col, Row, Rate } from 'antd'
// 电影版块头部卡片
import { CustomImage } from '../../../components/ImagePage/CustomImage'

// 顶部详情卡片
export const MovieBigCard = (props) => {

  const { object } = props

  return <div>
    <Card>
      <Row>
        <Col span={6} >
          <div style={{width: 300}}>
            <Row className='center'>
              {object.name}
            </Row>

            <Row className='center' style={{marginTop: 20}}>
              <CustomImage src={object.image_url} />
            </Row>
          </div>
        </Col>

        <Col span={18}>

          <Row span={8}>
            <Rate allowHalf value={object.rate} disabled/>
          </Row>

          <Row style={{margin: 20}}>
            {object.desc}
          </Row>

        </Col>

      </Row>
    </Card>


    <Card style={{marginTop: 20}}>
      富文本描述
      {object.detail}
    </Card>

  </div>
}
