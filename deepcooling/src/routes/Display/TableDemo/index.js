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



// 数据源
const data = [
  {"date": '20200228', "value": "60"},
  {"date": '20200229', "value": "80"},
  {"date": '20200301', "value": "99"},
  {"date": '20200302', "value": "89"},
  {"date": '20200303', "value": "79"},
  {"date": '20200304', "value": "89"},
  {"date": '20200305', "value": "49"},
  {"date": '20200306', "value": "79"},
  {"date": '20200307', "value": "69"},
];
const scale = {
   // date: {type: 'cat'},
  value: {
  	type: "linear",
   	// formatter: val => {
   	// 	return val + "%";
		// },
		// tickCount: 5,
	  //  ticks: ["0", "25", "50", "75", "100"],
	}
}


const columns = [
  {
      title: '空调名称',
      dataIndex: 'AirName',
      key: 'AirName',
  },
  {
      title: '回风温度',
      dataIndex: 'returnAirTemp',
      key: 'returnAirTemp',
  },
  {
      title: '水阀开度',
      dataIndex: 'valveOpening',
      key: 'valveOpening',
  },
  {
    title: '风机额定输出',
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
      dataIndex: 'coolingDemand',
      key: 'coolingDemand',
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



// 数据源
const data2 = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
	{
		year: "1997",
		value: 7,
	},
	{
		year: "1998",
		value: 9,
	},
	{
		year: "1999",
		value: 13,
	},
];



class AnimationDemo extends React.Component{


    state = {
        data:"",
        coolingDemand:"",
    }


    

      getReturnAirTemp = () => {
        axios.get('http://localhost:8080/havcdata/getbyname?havcId=1&valueName=returnAirTemp&interval=3&pageNum=1&pageSize=30').then((response) => {
          console.log(response);
          var dataArr = [];
          function rTime(date) {
            var json_date = new Date(date).toJSON();
            return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
          for(let i = 0; i < response.data.length; i++){
              dataArr.push({
                date:rTime(response.data[i].addtime),
                value:response.data[i].value
              })
          //  console.log(dataArr)
          }
          this.setState({
            data:dataArr
          })
        })
      }

      
      getCoolingDemand = () => {
        axios.get('http://localhost:8080/havcdata/getbyname?havcId=1&valueName=coolingDemand&interval=3&pageNum=1&pageSize=30').then((response) => {
          console.log(response);
          var dataArr = [];
          function rTime(date) {
            var json_date = new Date(date).toJSON();
            return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
          for(let i = 0; i < response.data.length; i++){
              dataArr.push({
                date:rTime(response.data[i].addtime),
                value:response.data[i].value
              })
          //  console.log(dataArr)
          }
          this.setState({
            coolingDemand:dataArr
          })
        })
      }


    componentDidMount(){
        this.getReturnAirTemp();
        this.getCoolingDemand();
    }



  render(){
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
          <Card title='空调回风温度曲线' bordered={false} className='card-item'>
              <Chart data={this.state.data} scale={scale} height={400} padding={[30, 20, 60, 40]}  forceFit interactions={['element-active']}>
              <Axis name="date" />
              <Axis name="value" />
              <Geom type="line" position="date*value" shape='smooth' />
              </Chart>
          </Card>
          <Card title='空调制冷量曲线' bordered={false} className='card-item'>
            <Chart height={400} data={this.state.coolingDemand} scale={scale} forceFit>
              <Axis name="date" />
              <Axis name="value" />
              <Geom type="line" position="date*value" shape='smooth' />
            </Chart>
          </Card>
          <Table columns={columns} dataSource={dataList} />
      </div>
    )
  }
}

const styles = {
}

export default AnimationDemo