import React from 'react'
import {Carousel,Card, Col, Row} from 'antd'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'  //用这个插件解决
import './style.css'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

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

  getDataCenterTemp30 = () =>{
    let option = {
      // Make gradient line here
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }, {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }],


      title: [{
        left: 'center',
        text: 'Gradient along the y axis'
      }, {
        top: '55%',
        left: 'center',
        text: 'Gradient along the x axis'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dateList
      }, {
        data: dateList,
        gridIndex: 1
      }],
      yAxis: [{
      }, {
        gridIndex: 1
      }],
      grid: [{
        bottom: '60%'
      }, {
        top: '60%'
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }, {
        type: 'line',
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
    };
    return option;
  }

  getMinTop15 = () =>{
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
        bottom: '4%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisTick: {                  //---坐标轴 刻度
          show: false,
        },
        axisLabel: {                 //---坐标轴 标签
          show: false,
        },
        splitLine: {                 //---grid 区域中的分隔线
          show: false,
        }
      },
      yAxis: {
        type: 'category',
        inverse:true, //y轴正序 默认倒序 false
        data: [32,28,20,12,10],
        axisLine: {                  //---坐标轴 轴线
          show: false,
        },
        axisTick: {                  //---坐标轴 刻度
          show: false,
        }
      },
      series: [
        {
          type: 'bar',
          data: [40,35,29,24,17]
        },
      ]
    };
    return option;
  }

  getMaxTop15 = () =>{
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
        bottom: '4%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisTick: {                  //---坐标轴 刻度
          show: false,
        },
        axisLabel: {                 //---坐标轴 标签
          show: false,
        },
        splitLine: {                 //---grid 区域中的分隔线
          show: false,
        }
      },
      yAxis: {
        type: 'category',
        inverse:true, //y轴正序 默认倒序 false
        data: [32,28,20,12,10],
        axisLine: {                  //---坐标轴 轴线
          show: false,
        },
        axisTick: {                  //---坐标轴 刻度
          show: false,
        }
      },
      series: [
        {
          type: 'bar',
          data: [50,24,11,10,8]
        },
      ]
    };
    return option;
  }

  getColdVarAndFuZhaiChars =() => {
    let  option = {
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

  render() {
    return (
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Card title="整体阶段预测节省电量">
                <h1>当前电量节省预估计 24%</h1>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="节能建议">
                <h1>11月中旬后建议 切换为 自然风冷</h1>
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Card title = "机房摘要" style={{ width: 300 }}>
                <p>机楼数量：67个</p>
                <p>机房数量：154个</p>
                <p>空调数量：310个</p>
                <p>运行空调数量：289个</p>
                <p>关闭空调数量：21个</p>
                <p>空调故障：2个</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title = "冷水机组摘要" style={{ width: 300 }}>
                <p>冷水机组数量：27个</p>
                <p>运行冷水机组数量：14个</p>
                <p>关闭冷水机组数量：3个</p>
                <p>压缩机个数：3个</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title = "环境摘要" style={{ width: 300 }}>
                <p>机能一体机运行总数：20个</p>
                <p>机能一体机运行数量：19</p>
                <p>机能一体机关闭数量：1个</p>
                <p>机能一体机故障数量：1个</p>
                <p>PLC总数：1个</p>
                <p>PLC运行数量：1个</p>
                <p>PLC关闭数量：1个</p>
                <p>PLC故障数量：1个</p>
              </Card>
            </Col>
          </Row>


          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={24}>
                <Card size="small" title="30天数据中心同期对比电量节省趋势图" bordered={false}>
                  <ReactEcharts option={this.getDataCenterTemp30()}/>
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ background: '#ECECEC', padding: '30px',marginTop:'20px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Card size="small" title="机房用电量低Top15排名" bordered={false}>
                  <ReactEcharts option={this.getColdVarAndFuZhaiChars()}/>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="机房用电量高Top15排名" bordered={false}>
                  <ReactEcharts option={this.getMaxTop15()}/>
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