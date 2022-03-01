import React from 'react'
import {Card, Button, BackTop, PageHeader, Descriptions, Col} from 'antd'
// eslint-disable-next-line no-unused-vars
import Shuffle from 'shufflejs'
import 'animate.css'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import {Chart, Line, Point, Tooltip, Legend, Axis, Geom} from "bizcharts";
import $ from "jquery";



// 数据源
const data = [
    {
        month: "Jan",
        city: "ExitPutTemperature",
        temperature: 7
    },
    {
        month: "Jan",
        city: "OutPutTemperature",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "ExitPutTemperature",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "OutPutTemperature",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "ExitPutTemperature",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "OutPutTemperature",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "ExitPutTemperature",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "OutPutTemperature",
        temperature: 8.5
    },
    {
        month: "May",
        city: "ExitPutTemperature",
        temperature: 18.4
    },
    {
        month: "May",
        city: "OutPutTemperature",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "ExitPutTemperature",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "OutPutTemperature",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "ExitPutTemperature",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "OutPutTemperature",
        temperature: 17
    },
    {
        month: "Aug",
        city: "ExitPutTemperature",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "OutPutTemperature",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "ExitPutTemperature",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "OutPutTemperature",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "ExitPutTemperature",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "OutPutTemperature",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "ExitPutTemperature",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "OutPutTemperature",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "ExitPutTemperature",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "OutPutTemperature",
        temperature: 4.8
    }
];

const scale = {
    temperature: { min: 0 },
    city: {
        formatter: v => {
            return {
                OutPutTemperature: '进水温度',
                ExitPutTemperature: '出水温度'
            }[v]
        }
    }
}



class AnimationDemo extends React.Component{


  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['冷源','冷机设备详情']}/>
        <PageHeader onBack={() => window.history.back()} title="返回" subTitle="冷机设备详情">
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="冷机编号">421421</Descriptions.Item>
                <Descriptions.Item label="冷机名称">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="冷机品牌">史泰登高</Descriptions.Item>
                <Descriptions.Item label="冷机型号">2017-01-10</Descriptions.Item>
                <Descriptions.Item label="冷机的控制信息">
                    因 ** 机房温度较高，此冷机需要频繁制冷量高达 ** 冷量！
                </Descriptions.Item>
            </Descriptions>
        </PageHeader>
          <Card title='进回水温度趋势曲线图' bordered={false} className='card-item'>
              <Chart data={data} scale={scale} height={400} padding={[30, 20, 60, 40]}  forceFit interactions={['element-active']}>
                  <Axis name="temperature"/>
                  <Axis name="month"/>
                  <Geom type="line" position="month*temperature" shape="smooth" color="city" label="temperature"/>
                  <Geom type="point" position="month*temperature" color="city" shape='circle'/>
                  <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
                  <Legend background={{
                      padding:[5,100,5,36],
                      style: {
                          fill: '#eaeaea',
                          stroke: '#fff'
                      }
                  }} />
              </Chart>
          </Card>
      </div>
    )
  }
}

const styles = {
}

export default AnimationDemo