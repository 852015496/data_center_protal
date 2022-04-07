import React from 'react'
import {Card,Row,Col,Table, Tag,Divider,Switch,PageHeader} from 'antd';
import { Chart, Geom, Axis, G2,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util } from 'bizcharts';
import axios from 'axios';
import moment from 'moment';
import DataSet from "@antv/data-set";
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'  //用这个插件解决
import { param } from 'jquery';


const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'cron表达式',
    dataIndex: 'cron',
    key: 'cron',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render : (text,record) => {
      return(
          <div>
              {
                  text === 0 ? <Tag color="#FF0000">停止</Tag> : text === 1 ? <Tag color="#008000">运行</Tag> : <Tag color="#FFD700">暂停</Tag>
              }
          </div>
      )
  }
  },
  {
    title: '类名称',
    dataIndex: 'className',
    key: 'className',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span size="middle">
        <a onClick = {this.stop}>停止</a>
        <Divider type="vertical" />
        <a onClick = {this.running}>启动</a>
        <Divider type="vertical" />
        <a onClick = {this.stoped}>暂停</a>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    name: '佳力图',
    address: '中国电信',
    setTemp: <Switch defaultChecked onChange={onChange} />,
    hfwd: 22,
    fspl:100,
  },
  {
    id: '2',
    name: '斯泰克',
    address: '中国移动',
    setTemp: <Switch defaultChecked onChange={onChange} />,
    hfwd: 15,
    fspl:100,
  },
  {
    id: '3',
    name: '美利云',
    address: '中国联通',
    setTemp: <Switch defaultChecked onChange={onChange} />,
    hfwd: 20,
    fspl:100,
  },
];

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

class service extends React.Component {

  state = {
    data:[],
    MemoryArr:[],
    NodeMemoryData:[],
    ContainerNetwork:[],
    Endpoint:{},
    Ports:{},
    CPUArr:[],
    MemoryArr:[],
  }
  // getReturnAirTemp = () => {
  //   axios.get('http://localhost:8080/havcdata/getbyname?havcId=1&valueName=returnAirTemp&interval=3&pageNum=1&pageSize=30').then((response) => {
  //     console.log(response);
  //     var dataArr = [];
  //     function rTime(date) {
  //       var json_date = new Date(date).toJSON();
  //       return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  //   }
  //     for(let i = 0; i < response.data.length; i++){
  //         dataArr.push({
  //           date:rTime(response.data[i].addtime),
  //           value:response.data[i].value
  //         })
  //     //  console.log(dataArr)
  //     }
  //     this.setState({
  //       data:dataArr
  //     })
  //   })
  // }
  // http://192.168.1.124:9090/api/v1/query_range?query=sum(rate(process_cpu_seconds_total%5B50s%5D))%20*%20100&start=1647855420&end=1647856320&step=30



  stop = () =>{
    axios.get("http://localhost:8080/mqtt/sendcommand?jobId=1&status=3").then((response)=>{

    })
  }

  running = () =>{
    axios.get("http://localhost:8080/mqtt/sendcommand?jobId=1&status=1").then((response)=>{
      
    })
  }

  stoped = () =>{
    axios.get("http://localhost:8080/mqtt/sendcommand?jobId=1&status=2").then((response)=>{
      
    })
  }

    

  getCPUMesage = () =>{
    axios.get('http://192.168.1.124:9090/api/v1/query_range?query=sum(rate(process_cpu_seconds_total%5B50s%5D))%20*%20100&start=1648188300&end=1648189200&step=60'
    ).then((rep) =>{
      console.log(rep)
      let data = rep.data.data.result[0].values;
      let arr = [];
      for (let i = 0; i < data.length; i++){
        arr.push(data[i][1]); 
      }
      // console.log(arr)
      this.setState({
          CPUArr:arr
      })
    })
  }

  getCPUOption = ()=>{
    let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      show:false,
      type: 'category',
      boundaryGap: false,
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: this.state.CPUArr,
        type: 'line',
        areaStyle: {}
      }
    ]
    }
    return option;
  }


  getMemoryMesage = () =>{
    axios.get('http://192.168.1.124:9090/api/v1/query_range?query=node_memory_MemAvailable&start=1648188300&end=1648189200&step=60'
    ).then((rep) =>{
      console.log(rep)
      let data = rep.data.data.result[0].values;
      let arr = [];
      for (let i = 0; i < data.length; i++){
        arr.push(data[i][1]); 
      }
      // console.log(arr)
      this.setState({
          MemoryArr:arr
      })
    })
  }

  getMemoryOption = ()=>{
    let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid:{
      show:false,
    },
    xAxis: {
      show:false,
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      // show:false,
      type: 'value',
      name: 'GIB'
    },
    series: [
      {
        data: this.state.MemoryArr,
        type: 'line'
      }
    ]
    }
    return option;
  }


  getContionerOption = ()=>{
    let option = {
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'A' },
            { value: 735, name: 'B' },
          ],
        }
      ]
    };
    return option;
  }


  
  jobList =() =>{
    axios.get('http://localhost:8080/regionjob/getRegionJobEntityById?regionId=1').then((rep) => {
      console.log(rep)
      let data =[];
      for(let i=0;i<rep.data.length;i++){
        data.push({
          id:i+1,
          name:rep.data[i].job_alias,cron:rep.data[i].cron,
          status:rep.data[i].status,
          className:rep.data[i].class_name,
          updateTime:rep.data[i].date
        })
      }
      this.setState({
        data:data,
      })     
    })
  }


  componentDidMount() {
    this.jobList();
    this.getCPUMesage();
    this.getMemoryMesage();
  }

  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.ContainerNetwork);
    const df = ds.createView().source(this.state.MemoryArr);
    df.transform({
      type:"fold",
      fields:["value","name"],
      key:"key",
      value:"value"
    })
    dv.transform({
      type:"fold",
      fields:["value1","value2"],
      key:"key",
      value:"value"
    })
    return (
      <div>
         <Row>
         <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title="返回"
    subTitle="边缘节点详情"
  />
          <Col span={8}>
            <Card title='CPU使用率' bordered={false} className='card-item'>
              <div style={{
                width: '555px',
                height: '355px',
                background: '#FFFFFF',
                marginTop:'2%',
                boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
              }}>
                <ReactEcharts option={this.getCPUOption()}/>
              </div>
            </Card>
          </Col>
       <Col span={8}>
       <Card title='内存运行空间' bordered={false} className='card-item'>
       <div style={{
                width: '555px',
                height: '355px',
                background: '#FFFFFF',
                marginTop:'2%',
                boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
              }}>
                <ReactEcharts option={this.getMemoryOption()}/>
              </div>
        </Card>
       </Col>
        <Col span={8}>
        <Card title='磁盘使用率' bordered={false} className='card-item'>
        <div style={{
                width: '555px',
                height: '355px',
                background: '#FFFFFF',
                marginTop:'2%',
                boxShadow: ':0px 2px 7px 1px rgba(105,106,107,0.08)'
              }}>
                <ReactEcharts option={this.getContionerOption()}/>
              </div>
          </Card>
        </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.data} />
        {/* <Card title='网络流量' bordered={false} className='card-item'>
          
        </Card> */}
       
      </div>
    )
  }
}

export default service