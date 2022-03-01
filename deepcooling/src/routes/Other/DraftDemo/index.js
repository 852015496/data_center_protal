import React from 'react'
import {Card, Button, BackTop, PageHeader, Descriptions, Col,Tag} from 'antd'
// eslint-disable-next-line no-unused-vars
import Shuffle from 'shufflejs'
import 'animate.css'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";


class DraftDemo extends React.Component{
  render(){
      const data = [
          {
              month: "Jan",
              风扇: 51,
              水泵: 125
          },
          {
              month: "Feb",
              风扇: 91,
              水泵: 132
          },
          {
              month: "Mar",
              风扇: 34,
              水泵: 141
          },
          {
              month: "Apr",
              风扇: 47,
              水泵: 158
          },
          {
              month: "May",
              风扇: 63,
              水泵: 133
          },
          {
              month: "June",
              风扇: 58,
              水泵: 143
          },
          {
              month: "July",
              风扇: 56,
              水泵: 176
          },
          {
              month: "Aug",
              风扇: 77,
              水泵: 194
          },
          {
              month: "Sep",
              风扇: 99,
              水泵: 115
          },
          {
              month: "Oct",
              风扇: 106,
              水泵: 134
          },
          {
              month: "Nov",
              风扇: 88,
              水泵: 110
          },
          {
              month: "Dec",
              风扇: 89,
              水泵: 118
          }
      ];
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
          type: "fold",
          fields: ["水泵", "风扇"],
          key: "key",
          value: "value"
      });
      const cols = {
          month: {
              range: [0, 1]
          }
      };
    return (
        <div>
          <CustomBreadcrumb arr={['冷源','冷却装置详情']}/>
          <PageHeader onBack={() => window.history.back()} title="返回" subTitle="冷机设备详情">
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="冷却泵:">421421</Descriptions.Item>
              <Descriptions.Item label="冷却塔:">Lili Qu</Descriptions.Item>
              <Descriptions.Item label="冷机品牌:">YORK</Descriptions.Item>
              <Descriptions.Item label="冷却状态:"><Tag color="cyan">运行</Tag></Descriptions.Item>
              <Descriptions.Item label="冷机型号:">2017-01-10</Descriptions.Item>
              <Descriptions.Item label="冷机的控制信息">
                因 ** 机房温度较高，此冷机需要频繁制冷量高达 ** 冷量！
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <Card title='水泵风扇频率趋势图' bordered={false} className='card-item'>
              <Chart height={400} data={dv} scale={cols} forceFit>
                  <Legend />
                  <Axis name="month" />
                  <Axis name="value" />
                  <Tooltip
                      crosshairs={{
                          type: "y"
                      }}
                  />
                  <Geom
                      type="line"
                      position="month*value"
                      size={2}
                      color={"key"}
                      shape={"hv"}
                  />
              </Chart>
          </Card>
        </div>
    )
  }
}

export default DraftDemo