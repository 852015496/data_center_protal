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
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'

let data1;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json",
  async : false,
  success: (iData) => { data1 = iData }
});


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
        title: '空调制冷输出',
        dataIndex: 'coolingOutput',
        key: 'coolingOutput',
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
let colors = {
  4: "rgba(216,70,10,1)",
  3: "rgba(216,121,10,1)",
  2: "rgba(226,187,32,1)",
  1: "rgba(2,189,229,1)",
}
class SpringText extends React.Component{

  state = {
      data:"",
      regionY:[],
      regionx:[]
  }


  

  getTwoOption = ()=>{
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      // top:'15%',
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      show:false,
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data:this.state.regionY
    },
    series: [
      {
        type: 'bar',
        data: this.state.regionX
      },
    ]
    }
    return option;
  }
  

  toAirList = () => {
    axios.get('http://localhost:8080/havcset/getlistbyregion?regionId=1').then((response) => {
      console.log(response);
      var dataArr = [];
      for(let i = 0; i < response.data.length; i++){
          dataArr.push({
            id:i+1,AirName:response.data[i].name,setTemp:response.data[i].setTemp,returnAirTemp:response.data[i].returnAirTemp,
            coolingOutput:response.data[i].coolingOutput,fanSpeed:response.data[i].fanSpeed,isRunning:response.data[i].isRunning
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

  getRegionByColl = () => {
    axios.get('http://localhost:8080/region/getRegionByColl').then((response) => {
      console.log(response);
      let ydata = []
      let xdata = []
     for (let i = 0; i < response.data.length; i++) {
      ydata.push(response.data[i].valuename) 
      xdata.push(response.data[i].value)
     }
     console.log(ydata)
      console.log(xdata)
      this.setState({
        regionX:xdata,
        regionY:ydata
      })
    })
  }

  componentDidMount(){
    this.toAirList();
    this.getRegionByColl();
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
            <Card title='空调制冷量' bordered={false} className='card-item'>
            <div style={{
              width: '555px',
              height: '495px',
              background: '#FFFFFF',
              marginTop:'2%',
              boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
            }}>
              <ReactEcharts option={this.getTwoOption()}/>
            </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='温感热力图' bordered={false} className='card-item'>
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
                      "#6E32C2-#1890FF-#12CCCC-#80FF73-#FAFFA8-#FFC838-#FF8C12-#FA541C-#F51D27"
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