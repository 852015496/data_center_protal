import React from 'react';
import axios from 'axios';
import $ from "jquery";
import {Card, Button, Row, PageHeader, Descriptions, Col,Tag,Table, Divider,} from 'antd'
import {
  Chart,
  Guide,
  Legend,
  Point,
  Tooltip,
  Axis,
  View,
  Label,
  Interaction,
  Polygon,
  Geom
} from 'bizcharts';
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";

let data1;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json",
  async : false,
  success: (iData) => { data1 = iData }
});

// 空调热力图
//下标0:代表第一列
//下标1:代表第一行
//下标2:代表的是值
  const data = [
    [0, 0, 10],
    [0, 1, 19],
    [0, 2, 8],
    [0, 3, 24],
    [0, 4, 67],
    [1, 0, 92],
    [1, 1, 58],
    [1, 2, 78],
    [1, 3, 117],
    [1, 4, 48],
    [2, 0, 35],
    [2, 1, 15],
    [2, 2, 123],
    [2, 3, 64],
    [2, 4, 52],
    [3, 0, 72],
    [3, 1, 132],
    [3, 2, 114],
    [3, 3, 19],
    [3, 4, 16],
    [4, 0, 38],
    [4, 1, 5],
    [4, 2, 8],
    [4, 3, 117],
    [4, 4, 115],
    [5, 0, 88],
    [5, 1, 32],
    [5, 2, 12],
    [5, 3, 6],
    [5, 4, 120],
    [6, 0, 13],
    [6, 1, 44],
    [6, 2, 88],
    [6, 3, 98],
    [6, 4, 96],
    [7, 0, 31],
    [7, 1, 1],
    [7, 2, 82],
    [7, 3, 32],
    [7, 4, 30],
    [8, 0, 85],
    [8, 1, 97],
    [8, 2, 123],
    [8, 3, 64],
    [8, 4, 84],
    [9, 0, 47],
    [9, 1, 114],
    [9, 2, 31],
    [9, 3, 48],
    [9, 4, 91],
  ];
  const source = data.map((arr) => {
    return {
      name: arr[0],
      day: arr[1],
      sales: arr[2],
    };
  });
  const scale = {
    //名称 列展示
    name: {
      type: 'cat',
      values: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'],
    },
    //日期 行展示
    day: {
      type: 'cat',
      values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    sales: {
      nice: true,
    }
  };

const columns = [
    {
        title: '空调编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '空调名称',
        dataIndex: 'AirName',
        key: 'AirName',
    },
    {
        title: '设置温度',
        dataIndex: 'setTemp',
        key: 'setTemp',
    },
    {
        title: '回风温度',
        dataIndex: 'returnAirTemp',
        key: 'returnAirTemp',
    },
    // {
    //     title: '水阀开度',
    //     dataIndex: 'valveOpening',
    //     key: 'valveOpening',
    // },
    {
      title: '风扇频率',
      dataIndex: 'fanSpeed',
      key: 'fanSpeed',
  },
    // {
    //     title: '风扇频率',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <span>
    //     {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //             color = 'volcano';
    //         }
    //         return (
    //             <Tag color={color} key={tag}>
    //                 {tag.toUpperCase()}
    //             </Tag>
    //         );
    //     })}
    //   </span>
    //     ),
    // },
    {
        title: '压缩机状态',
        dataIndex: 'isRunning',
        key: 'isRunning',
        render: (text, record) => (
            text == "1" ? <Tag color="green">开</Tag> :  <Tag color="red">关</Tag>
        ),
    },
    {
        title: '空调制冷量',
        dataIndex: 'coolingDemand',
        key: 'coolingDemand',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
        <a href="/region/AirRootList">详情</a>
        <Divider type="vertical" />
        <a>编辑</a>
        <Divider type="vertical" />
        <a>发送状态</a>
      </span>
        ),
    },
];

const dataList = [
    {
        key: '1',
        id:'A1001',
        AirName:'斯泰克',
        name: '23',
        age: 32,
        address: '39',
        tags: ['nice', 'developer'],
        ysjStatus: '1',
        ktzll: '86',
    },
    {
        key: '2',
        id:'A1002',
        AirName:'斯泰克',
        name: '21',
        age: 36,
        address: '36',
        tags: ['loser'],
        ysjStatus: '2',
        ktzll: '70',
    },
    {
        key: '3',
        id:'A1003',
        AirName:'斯泰克',
        name: '22',
        age: 38,
        address: '31',
        tags: ['cool', 'teacher'],
        ysjStatus: '1',
        ktzll: '90',
    },
];

class SpringText extends React.Component{

  state = {
      data:"",
  }


  toAirList = () => {
    axios.get('http://localhost:8080/havcset/getlistbyregion?regionId=1').then((response) => {
      console.log(response);
      var dataArr = [];
      for(let i = 0; i < response.data.length; i++){
          dataArr.push({
            id:i+1,AirName:response.data[i].name,setTemp:response.data[i].setTemp,returnAirTemp:response.data[i].returnAirTemp,
            coolingDemand:response.data[i].coolingDemand,fanSpeed:response.data[i].fanSpeed,isRunning:response.data[i].isRunning
          })
       console.log(dataArr)
      }

      this.setState({
        data:dataArr
      })
    })
    // {
    //   this.state.data.map((item,index) =>{
    //     console.log(item);
    //   })
    // }
  }

  componentDidMount(){
    this.toAirList();
  }



  render(){
    const { Image } = Guide;
    return (
      <div>
        <CustomBreadcrumb arr={['机房']}/>
        {/*<PageHeader onBack={() => window.history.back()} title="返回" subTitle="机房概况">*/}
        {/*  <Descriptions size="small" column={3}>*/}
        {/*    <Descriptions.Item label="冷却泵:">421421</Descriptions.Item>*/}
        {/*    <Descriptions.Item label="冷却塔:">Lili Qu</Descriptions.Item>*/}
        {/*    <Descriptions.Item label="冷机品牌:">YORK</Descriptions.Item>*/}
        {/*    <Descriptions.Item label="冷却状态:"><Tag color="cyan">运行</Tag></Descriptions.Item>*/}
        {/*    <Descriptions.Item label="冷机型号:">2017-01-10</Descriptions.Item>*/}
        {/*    <Descriptions.Item label="冷机的控制信息">*/}
        {/*      因 ** 机房温度较高，此冷机需要频繁制冷量高达 ** 冷量！*/}
        {/*    </Descriptions.Item>*/}
        {/*  </Descriptions>*/}
        {/*</PageHeader>*/}
        <Row gutter={24}>
          <Col span={12}>
            <Card title='空调制冷分布图' bordered={false} className='card-item'>
              <Chart
                  scale={scale}
                  height={500}
                  data={source}
                  forceFit
                  pure
              >

                {/*<Axis*/}
                {/*    name={'name'}*/}
                {/*    tickLine={null}*/}
                {/*    grid={{*/}
                {/*      alignTick: false,*/}
                {/*      line: {*/}
                {/*        style: {*/}
                {/*          lineWidth: 1,*/}
                {/*          lineDash: null,*/}
                {/*          stroke: '#f0f0f0',*/}
                {/*        },*/}
                {/*      },*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Axis*/}
                {/*    name={'day'}*/}
                {/*    title={null}*/}
                {/*    grid={{*/}
                {/*      alignTick: false,*/}
                {/*      line: {*/}
                {/*        style: {*/}
                {/*          lineWidth: 1,*/}
                {/*          lineDash: null,*/}
                {/*          stroke: '#f0f0f0',*/}
                {/*        },*/}
                {/*      },*/}
                {/*    }}*/}
                {/*/>*/}
                <Tooltip shared showMarkers={false}/>
                <Geom
                    type="polygon"
                    position="name*day"
                    color={['sales', '#BAE7FF-#1890FF-#0050B3']}
                    style={{
                      stroke: '#fff',
                      lineWidth: 1,
                    }}
                >
                  <Label
                      content="sales"
                      offset={-2}
                      textStyle={{
                        fill: '#fff',
                        fontWeight: 'bold',
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, .45)',
                      }}
                  />
                </Geom>
              </Chart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='温感热力分布图' bordered={false} className='card-item'>
              <Chart
                  padding={[0, 30, 60, 30]}
                  data={data1}
                  forceFit
              >
                <Tooltip showTitle={false} />
                <Legend offset={10} />
                <Geom
                    type="heatmap"
                    position="g*l"
                    color={[
                      "tmp",
                      "#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2"
                    ]}
                />
                <Guide>
                  <Image
                      start={["min", "max"]}
                      end={["max", "min"]}
                      // src="https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png"
                  />
                </Guide>
              </Chart>
            </Card>
          </Col>
        </Row>
          <Table columns={columns} dataSource={this.state.data} />
      </div>
    )
  }
}
export default SpringText