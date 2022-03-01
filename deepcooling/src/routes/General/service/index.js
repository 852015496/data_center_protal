import React from 'react'
import {Card} from 'antd';
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
    formatter: val => {
      return val  + '%';
    },
    tickCount: 5,
    // ticks: ["0", "25", "50", "75", "100"],
  }
};

const scale1 = {
  // date: {type: 'cat'},
  value: {
    type: "linear",
    formatter: val => {
      return val  + 'GiB';
    },
    tickCount: 5,
    // ticks: ["0", "25", "50", "75", "100"],
  }
};

const scale2 = {
  // date: {type: 'cat'},
  value: {
    type: "linear",
    formatter: val => {
      return val  + 'KiB';
    },
    tickCount: 5,
    // ticks: ["0", "25", "50", "75", "100"],
  }
};

const cols = {
  month: {
    range: [0, 1]
  }
};


function getTopKibArr(){
  return axios.get('http://192.168.1.174:9090/api/v1/query_range?query=sum(rate(container_network_receive_bytes_total%7Bid%3D%22%2F%22%7D%5B50s%5D))%20by%20(id)&start=1642067220&end=1642068120&step=30');
}
function getBottomArr(){
  return axios.get('http://192.168.1.174:9090/api/v1/query_range?query=-%20sum(rate(container_network_transmit_bytes_total%7Bid%3D%22%2F%22%7D%5B50s%5D))%20by%20(id)&start=1642067220&end=1642068120&step=30');
}

export function getTime(timeStamp){
  var date = new Date(Number(timeStamp)*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  var strDate = Y+M+D+h+m+s;
  return strDate;
}


class service extends React.Component {

  state = {
    data:[],
    MemoryArr:[],
    NodeMemoryData:[],
    ContainerNetwork:[],
    Endpoint:{},
    Ports:{}
  }

  CPUchart = () => {
    axios.get('http://192.168.1.174:9090/api/v1/query_range?query=sum(rate(process_cpu_seconds_total%5B50s%5D))%20*%20100&start=1642048350&end=1642049250&step=30').then((response) => {
      // console.log(response);
      let data =[];
      for (let i = 0; i < response.data.data.result.length; i++) {
        // console.log({ "cpu":response.data.data.result[i].metric.cpu})
        // console.log({ "job":response.data.data.result[i].metric.job})
        // console.log(response.data.data.result[i].values);
        for (let j = 0; j < response.data.data.result[i].values.length; j++) {
          var timestamp = getTime(response.data.data.result[i].values[j][0])
          data.push({
            "date" :timestamp,
            "value":response.data.data.result[i].values[j][1],
          });
        }
        // console.log(data)
        // console.log(timestamp)
        this.setState({
          data:data
        })
      }
    })
  }

  NodeMemory = () => {
    axios.get('http://192.168.1.174:9090/api/v1/query_range?query=node_memory_MemTotal%20-%20node_memory_MemAvailable&start=1642063650&end=1642064550&step=30').then((response) => {
      // console.log(response);
      let NodeMemoryData =[];
      for (let i = 0; i < response.data.data.result.length; i++) {
        // console.log({ "cpu":response.data.data.result[i].metric.cpu})
        // console.log({ "job":response.data.data.result[i].metric.job})
        // console.log(response.data.data.result[i].values);
        for (let j = 0; j < response.data.data.result[i].values.length; j++) {
          let timestamp = getTime(response.data.data.result[i].values[j][0])
          NodeMemoryData.push({
            "date" :timestamp,
            "value":response.data.data.result[i].values[j][1],
          });
        }
        // console.log(NodeMemoryData)
        // console.log(timestamp)
        this.setState({
          NodeMemoryData:NodeMemoryData
        })
      }
    })
  }


  // ContainerNetWork = () => {
  //   axios.all([getTopKibArr(),getBottomArr()]).then(
  //     axios.spread(function(acct,perms){
  //     console.log(acct)
  //     console.log(perms)
  //     let ContainerNetwork =[];
  //     for (let i = 0; i < acct.data.data.result.length; i++) {
  //       for (let j = 0; j < acct.data.data.result[i].values.length; j++) {
  //         let timestamp = getTime(acct.data.data.result[i].values[j][0])
  //         ContainerNetwork.push({
  //           "date":timestamp,
  //           "value1":acct.data.data.result[i].values[j][1],
  //           "value2":perms.data.data.result[i].values[j][1]
  //         })
  //       }
  //       console.log(ContainerNetwork)
  //     }
  //   }))
  // }



  ContainerNetWork = () => {
    axios.get('http://192.168.1.174:9090/api/v1/query_range?query=sum(rate(container_network_receive_bytes_total%7Bid%3D%22%2F%22%7D%5B50s%5D))%20by%20(id)&start=1642067220&end=1642068120&step=30').then((resp) => {
      // console.log(response)
      for (let i = 0; i < resp.data.data.result.length; i++) {
        for (let j = 0; j < resp.data.data.result[i].values.length; j++) {
          let value1 = resp.data.data.result[i].values[j][1];
          // console.log(value1);
          axios.get('http://192.168.1.174:9090/api/v1/query_range?query=-%20sum(rate(container_network_transmit_bytes_total%7Bid%3D%22%2F%22%7D%5B50s%5D))%20by%20(id)&start=1642067220&end=1642068120&step=30').then((response) => {
      let ContainerNetwork =[];
      for (let k = 0; k < response.data.data.result.length; k++) {
        for (let l = 0; l < response.data.data.result[k].values.length; l++) {
          var timestamp = getTime(response.data.data.result[k].values[l][0])
            ContainerNetwork.push({
              "date" :timestamp,
              "value1":resp.data.data.result[i].values[j][1],
              "value2":response.data.data.result[k].values[l][1],
            });
        }
        // console.log(ContainerNetwork)
        // console.log(timestamp)
        this.setState({
          ContainerNetwork:ContainerNetwork
        })
      }
    })
        }
      }
    })
  }

  memoryMemAvailable =() =>{
    axios.get('http://192.168.1.174:9090/api/v1/query?query=(1%20-%20(node_memory_MemAvailable_bytes%20%2F%20node_memory_MemTotal_bytes%20))*%20100&time=1642756861').then((rep) => {
      console.log(rep)
      // console.log(rep.data.data.result[0].value[1])
      let MemoryArr = [];
      for (let i = 0; i < rep.data.data.result.length; i++) {
          var timestamp = getTime(rep.data.data.result[i].value[0])
          // var value = rep.data.data.result[i].value[j][1]
          MemoryArr.push({
            "date" :timestamp,
            "value":rep.data.data.result[i].value[1],
            "name":rep.data.data.result[i].metric.hostname,
          });
        }
        console.log(MemoryArr)
      this.setState({
        MemoryArr:MemoryArr
      })
    })
  }


  componentDidMount() {
    this.CPUchart();
    this.NodeMemory();
    this.ContainerNetWork();
    this.memoryMemAvailable();
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
        <Card title='CPU使用率' bordered={false} className='card-item'>
          <Chart height={400} forceFit data={this.state.data.map(item => {
            const date = moment(item.date).format('YYYY-MM-DD');
            return Object.assign({ date }, item);
          })} scale={scale}>
            <Axis name="date" />
            <Axis name="value" />
            <Geom type="line" position="date*value" shape='smooth' />
          </Chart>
        </Card>
        <Card title='内存运行空间' bordered={false} className='card-item'>
          <Chart height={400} forceFit data={this.state.NodeMemoryData.map(item => {
            const date = moment(item.date).format('YYYY-MM-DD');
            return Object.assign({ date }, item);
          })} scale={scale1}>
            <Axis name="date" />
            <Axis name="value" />
            <Geom type="line" position="date*value" shape='smooth' />
          </Chart>
        </Card>
        <Card title='网络流量' bordered={false} className='card-item'>
          <Chart height={400}
                 data={dv}
                 scale={scale2} forceFit>
            <Legend />
            <Axis name="date" />
            <Axis name="value" />
            <Tooltip
                crosshairs={{
                  type: "y"
                }}
            />
            <Geom
                type="line"
                position="date*value"
                size={2}
                color={["key"]}
                shape={"circle"}
            />
          </Chart>
        </Card>
        <Card title='磁盘使用率' bordered={false} className='card-item'>
          <Chart height={400}
                 data={df}
                 scale={scale2} forceFit>
            <Legend />
            <Axis name="date" />
            <Axis name="value" />
            <Tooltip
                crosshairs={{
                  type: "y"
                }}
            />
            <Geom
                type="line"
                position="date*value"
                size={2}
                color={["key"]}
                shape={"circle"}
            />
          </Chart>
        </Card>
      </div>
    )
  }
}

export default service