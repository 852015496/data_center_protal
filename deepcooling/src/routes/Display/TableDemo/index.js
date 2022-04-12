import React from 'react'
import {Card, Button, Row, PageHeader, Descriptions, Col,Tag,Table, Divider,} from 'antd'
// eslint-disable-next-line no-unused-vars
import Shuffle from 'shufflejs'
import 'animate.css'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import { Chart, Geom, Axis,Line, Point, Tooltip } from 'bizcharts';
import moment from 'moment';
import $ from "jquery";
import axios from 'axios';
import { List, message, Avatar, Spin } from 'antd';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'








const columns = [
  {
      title: '时间戳',
      dataIndex: 'addtime',
      key: 'addtime',
  },
  {
      title: '空调回风温度',
      dataIndex: 'returnAirTempValue',
      key: 'returnAirTempValue',
  },
//   {
//       title: '水阀开度',
//       dataIndex: 'valveOpening',
//       key: 'valveOpening',
//   },
//   {
//     title: '风机额定输出',
//     dataIndex: 'fanSpeed',
//     key: 'fanSpeed',
// },
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
  // {
  //     title: '压缩机状态',
  //     dataIndex: 'isRunning',
  //     key: 'isRunning',
  //     render: (text, record) => (
  //         text == "1" ? <Tag color="green">开</Tag> :  <Tag color="red">关</Tag>
  //     ),
  // },
  {
      title: '空调制冷量',
      dataIndex: 'coolingDemandValue',
      key: 'coolingDemandValue',
  },
  // {
  //     title: '操作',
  //     key: 'action',
  //     render: (text, record) => (
  //         <span>
  //     <a href="/#">风机额定风量调整</a>
  //     <Divider type="vertical" />
  //     <a>水阀开度调整</a>
  //     {/* <Divider type="vertical" />
  //     <a>发送状态</a> */}
  //   </span>
  //     ),
  // },
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







class AnimationDemo extends React.Component{


    state = {
      data: [],
      date: [],
      coddingDate:[],
      coodingData:[],
      loading: false,
      hasMore: true,
      coolingDemand:"",
      tableArr:""
    }

    getTwoOption = ()=>{
      let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.state.data,
          type: 'line',
          areaStyle: {}
        }
      ]
      }
      return option;
    }

    getColdVarOption = ()=>{
      let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: this.state.coddingDate
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.state.coodingData,
          type: 'line'
        }
      ]
      }
      return option;
    }
    


    getTableList = ()=>{
      axios.get('http://localhost:8080/havcdata/getHavcList').then((response) => {
          console.log(response);
          let dataArr =[];
          for (let i = 0; i < response.data.length; i++) {
            dataArr.push({
              addtime:moment(response.data[i].addtime).format("YYYY-MM-DD"),
              returnAirTemp:response.data[i].valuename,
              returnAirTempValue:response.data[i].value,
              coolingDemand:response.data[i].value,
              coolingDemandValue:response.data[i].value,
            })
          }
          this.setState({
            tableArr:dataArr
          })
        })
    }
    

      getReturnAirTemp = () => {
        axios.get('http://localhost:8080/havcdata/getbyname?havcId=1&valueName=returnAirTemp&interval=3&pageNum=1&pageSize=7').then((response) => {
          console.log(response);
          var dataArr = [];
          var dateArr = [];
        //   function rTime(date) {
        //     var json_date = new Date(date).toJSON();
        //     return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        // }
          for(let i = 0; i < response.data.length; i++){
            dateArr.push(moment(response.data[i].addtime).format("YYYY-MM-DD"))
              dataArr.push({
                value:response.data[i].value
              })
          //  console.log(dateArr)
          }
          this.setState({
            data:dataArr,
            date:dateArr
          })
        })
      }

      
      getCoolingDemand = () => {
        axios.get('http://localhost:8080/havcdata/getbyname?havcId=1&valueName=coolingDemand&interval=3&pageNum=1&pageSize=30').then((response) => {
          console.log(response);
          var dataArr = [];
          var dateArr = [];
        //   function rTime(date) {
        //     var json_date = new Date(date).toJSON();
        //     return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        // }
          for(let i = 0; i < response.data.length; i++){
              dateArr.push(moment(response.data[i].addtime).format("YYYY-MM-DD"))
              dataArr.push({
                value:response.data[i].value
              })
          //  console.log(dataArr)
          }
          this.setState({
           coddingDate:dateArr,
           coodingData:dataArr
          })
        })
      }


    componentDidMount(){
        this.getReturnAirTemp();
        this.getCoolingDemand();
        this.getTableList();
    }

   


  render(){
    const data = this.state.coodingData;
    return (
      <div>
        <CustomBreadcrumb arr={['机房','机房详情']}/>
        <PageHeader onBack={() => window.history.back()} title="返回" subTitle="机房空调详情">
            {/* <Descriptions size="small" column={3}>
                <Descriptions.Item label="冷机编号">421421</Descriptions.Item>
                <Descriptions.Item label="冷机名称">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="冷机品牌">史泰登高</Descriptions.Item>
                <Descriptions.Item label="冷机型号">2017-01-10</Descriptions.Item>
                <Descriptions.Item label="冷机的控制信息">
                    因 ** 机房温度较高，此冷机需要频繁制冷量高达 ** 冷量！
                </Descriptions.Item>
            </Descriptions> */}
        </PageHeader>
        <Row gutter={24}>
          <Col span = {12}>
          <Card title='空调回风温度曲线' bordered={false} className='card-item'>
          <div style={{
              width: '555px',
              height: '355px',
              background: '#FFFFFF',
              marginTop:'2%',
              boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
            }}>
              <ReactEcharts option={this.getTwoOption()}/>
            </div>
          </Card>
          </Col>
          <Col span = {12}>
          <Card title='空调制冷量曲线' bordered={false} className='card-item'>
          <div style={{
              width: '555px',
              height: '355px',
              background: '#FFFFFF',
              marginTop:'2%',
              boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
            }}>
              <ReactEcharts option={this.getColdVarOption()}/>
            </div>
           </Card>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.tableArr} />
      </div>
    )
  }
}

const styles = {
}

export default AnimationDemo