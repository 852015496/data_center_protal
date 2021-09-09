import React from 'react'
import {Carousel,Card, Col, Row} from 'antd'
import './style.css'

const imgs = [
  'http://47.99.130.140/imgs/wallhaven-p8r1e9.jpg',
  'http://47.99.130.140/imgs/wallhaven-e7zyy8.jpg',
  'http://47.99.130.140/imgs/wallhaven-6k9e7q.jpg',
  'http://47.99.130.140/imgs/photo.jpg',
]


class Home extends React.Component {
  render() {
    return (
        <div>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={24}>
              <Col span={4}>
                <Card title="机楼数量" bordered={false}>
                  67个
                </Card>
              </Col>
              <Col span={4}>
                <Card size="small" title="机房数量" bordered={false}>
                  145个
                </Card>
              </Col>
              <Col span={4}>
                <Card size="small" title="空调数量" bordered={false}>
                  310个
                </Card>
              </Col>
              <Col span={4}>
                <Card size="small" title="运行空调数量" bordered={false}>
                  289个
                </Card>
              </Col>
              <Col span={4}>
                <Card size="small" title="关闭空调数量" bordered={false}>
                  21个
                </Card>
              </Col>
              <Col span={4}>
                <Card size="small" title="空调故障数量" bordered={false}>
                  2个
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={8}>
                <Card size="small" title="冷水机组数量" bordered={false}>
                 80个
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="运行冷水机组数量" bordered={false}>
                  78个
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="关闭冷水机组数量" bordered={false}>
                 2个
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={6}>
                <Card size="small" title="机能一体机运行总数" bordered={false}>
                  20个
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" title="机能一体机运行数量" bordered={false}>
                  19个
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" title="机能一体机关闭数量" bordered={false}>
                  1个
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" title="机能一体机故障数量" bordered={false}>
                  1个
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Card size="small" title="整体PUE" bordered={false}>
                  整体PUE
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="机楼PUE" bordered={false}>
                  机楼PUE
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Card size="small" title="机房PUE低的Top15排名" bordered={false}>
                  机房PUE低的Top15排名
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="机房PUE高的Top15排名" bordered={false}>
                  机房PUE高的Top15排名
                </Card>
              </Col>
            </Row>
          </div>
        </div>
     /* <div style={styles.bg} className='home'>
        <Carousel arrows effect='fade' className='size'>
          {imgs.map(item=><div key={item}><div className='size' style={{backgroundImage:`url(${item})`}}/></div>)}
          {/!*不用img标签是因为图片大小会出现问题*!/}
        </Carousel>
      </div>*/
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home