import React from 'react'
import {Carousel,Card, Col, Row} from 'antd'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'  //用这个插件解决
import axios from 'axios';
import './style.css'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import TypingCard from "../../components/HomeCard/index";
import HomeCard from "../../components/HomeCard/home";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Label,
} from 'bizcharts';
const dataArr = [
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
const source = [];

for (let i = 0; i < dataArr.length; i++) {
  const item = dataArr[i];
  const obj = {};
  obj.name = item[0];
  obj.day = item[1];
  obj.sales = item[2];
  source.push(obj);
}

const cols = {
  name: {
    type: 'cat',
    values: [
      'Alexander',
      'Marie',
      'Maximilian',
      'Sophia',
      'Lukas',
      'Maria',
      'Leon',
      'Anna',
      'Tim',
      'Laura',
    ],
  },
  day: {
    type: 'cat',
    values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
};

const imgs = [
  'http://47.99.130.140/imgs/wallhaven-p8r1e9.jpg',
  'http://47.99.130.140/imgs/wallhaven-e7zyy8.jpg',
  'http://47.99.130.140/imgs/wallhaven-6k9e7q.jpg',
  'http://47.99.130.140/imgs/photo.jpg',
]
var data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

var dateList = data.map(function (item) {
  return item[0];
});
var valueList = data.map(function (item) {
  return item[1];
});


class Home extends React.Component {

  state = {
    buildingNumber:"",
    AirRoomNumber:"",
    havcNumber:"",
    onAirStatusNumber:"",
    offAirStatusNumber:"",
    clodAirArrNumber:"",
    onClodAirArrNumber:"",
    offClodAirArrNumber:""
  }

  componentDidMount(){
    this.buildingNumber();
    this.AirRoomNumber();
    this.havcNumber();
    this.onAirStatus();
    this.offAirStatus();
    this.clodAirArrNumber();
    this.onClodAirArrNumber();
    this.offClodAirArrNumber();
  }

  buildingNumber = () => {
    axios.get('http://127.0.0.1:8080/building/getcountbyidc?idcId=105').then((response) => {
      // console.log(response);
      var buildingNumber = response.data;
      this.setState({
        buildingNumber:buildingNumber
      })
    })
  }
  
  AirRoomNumber = () => {
    axios.get('http://127.0.0.1:8080/region/getcountbybld?bldId=23').then((response) => {
      // console.log(response);
      var AirRoomNumber = response.data;
      this.setState({
        AirRoomNumber:AirRoomNumber
      })
    })
  }

  havcNumber = () => {
    axios.get('http://localhost:8080/havcset/getcountbyregion?regionId=1&status=1').then((response) => {
      // console.log(response);
      var havcNumber = response.data;
      this.setState({
        havcNumber:havcNumber
      })
    })
  }

  onAirStatus = () => {
    axios.get('http://localhost:8080/havcset/getcountbyidc?idcId=105&status=on').then((response) => {
      // console.log(response);
      var onAirStatusNumber = response.data;
      this.setState({
        onAirStatusNumber:onAirStatusNumber
      })
    })
  }

  offAirStatus = () => {
    axios.get('http://localhost:8080/havcset/getcountbyidc?idcId=105&status=off').then((response) => {
      // console.log(response);
      var offAirStatusNumber = response.data;
      this.setState({
        offAirStatusNumber:offAirStatusNumber
      })
    })
  }

  clodAirArrNumber = () => {
    axios.get('http://localhost:8080/chillerset/getcountbybld?bldId=105&status=all').then((response) => {
      // console.log(response);
      var clodAirArrNumber = response.data;
      this.setState({
        clodAirArrNumber:clodAirArrNumber
      })
    })
  }

  onClodAirArrNumber = () => {
    axios.get('http://localhost:8080/chillerset/getcountbybld?bldId=105&status=no').then((response) => {
      // console.log(response);
      var onClodAirArrNumber = response.data;
      this.setState({
        onClodAirArrNumber:onClodAirArrNumber
      })
    })
  }

  offClodAirArrNumber = () => {
    axios.get('http://localhost:8080/chillerset/getcountbybld?bldId=105&status=off').then((response) => {
      // console.log(response);
      var offClodAirArrNumber = response.data;
      this.setState({
        offClodAirArrNumber:offClodAirArrNumber
      })
    })
  }


  getDataCenterTemp30 = () =>{
    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    let option = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        right: '20%'
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['制冷量', '耗电量', '温度']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '制冷量',
          min: 0,
          max: 250,
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} '
          }
        },
        {
          type: 'value',
          name: '耗电量',
          min: 0,
          max: 250,
          position: 'right',
          offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} '
          }
        },
        {
          type: 'value',
          name: '制冷效率',
          min: 0,
          max: 25,
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: '制冷量',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '耗电量',
          type: 'bar',
          yAxisIndex: 1,
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        },
        {
          name: '温度',
          type: 'line',
          yAxisIndex: 2,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    };
    return option;
  }


  getColdArrLLAndFZ =()=>{
    let option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Gradient Stacked Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    };
    return option;
  }


  getBuZhiDaoName = () => {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    return option;
  }

  render() {
    return (
        <div>
          <Row>
            <Col span={12}>
              <Card>
                <HomeCard source='当前电量节省预估计 24%'/>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <TypingCard source='11月中旬后建议 切换为 自然风冷'/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Card title = "机房环境摘要" style={{height:'300px'}}>
                <p>机楼数量：{this.state.buildingNumber}个</p>
                <p>机房数量：{this.state.AirRoomNumber}个</p>
                <p>空调数量：{this.state.havcNumber}个</p>
                <p>运行空调数量：{this.state.onAirStatusNumber}个</p>
                <p>关闭空调数量：{this.state.offAirStatusNumber}个</p>
                <p>空调故障：2个</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title = "冷水机组摘要" style={{height:'300px'}}>
                <p>冷水机组数量：{this.state.clodAirArrNumber}个</p>
                <p>运行冷水机组数量：{this.state.onClodAirArrNumber}个</p>
                <p>关闭冷水机组数量：{this.state.offClodAirArrNumber}个</p>
                <p>压缩机个数：3个</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title = "设备环境摘要" style={{height:'300px'}}>
                <p>机能一体机运行总数：20个</p>
                <p>机能一体机运行数量：19</p>
                <p>机能一体机关闭数量：1个</p>
                <p>PLC总数：1个</p>
                <p>PLC运行数量：1个</p>
                <p>PLC关闭数量：1个</p>
              </Card>
            </Col>
          </Row>
            <Row>
              <Col span={12}>
                <Card size="small" title="冷机制冷负载趋势图" bordered={false}>
                  <ReactEcharts option={this.getDataCenterTemp30()}/>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="冷却制冷负载趋势图" bordered={false}>
                  <ReactEcharts option={this.getDataCenterTemp30()}/>
                </Card>
              </Col>
            </Row>
          <Row>
            <Col span={12}>
              <Card size="small" title="冷却塔负载个数趋势图" bordered={false}>
                <ReactEcharts option={this.getDataCenterTemp30()}/>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="机房平均温度热力图" bordered={false}>
                <Chart
                    height={300}
                    data={source}
                    scale={cols}
                    padding={[20, 80, 120, 85]}
                    forceFit
                >
                  {/*<Axis*/}
                  {/*    name="name"*/}
                  {/*    grid={{*/}
                  {/*      align: 'center',*/}
                  {/*      lineStyle: {*/}
                  {/*        lineWidth: 1,*/}
                  {/*        lineDash: null,*/}
                  {/*        stroke: '#f0f0f0',*/}
                  {/*      },*/}
                  {/*      showFirstLine: true,*/}
                  {/*    }}*/}
                  {/*/>*/}
                  {/*<Axis*/}
                  {/*    name="day"*/}
                  {/*    grid={{*/}
                  {/*      align: 'center',*/}
                  {/*      lineStyle: {*/}
                  {/*        lineWidth: 1,*/}
                  {/*        lineDash: null,*/}
                  {/*        stroke: '#f0f0f0',*/}
                  {/*      },*/}
                  {/*    }}*/}
                  {/*/>*/}
                  <Tooltip />
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
          </Row>

        </div>
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