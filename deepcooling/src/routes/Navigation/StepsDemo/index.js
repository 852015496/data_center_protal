import React from 'react'
import {Card, Col, Row, Radio, Icon, Button, Steps, message, Divider, Table, Tag} from 'antd'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import TypingCard from '../../../components/TypingCard'


const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '设备名称',
        dataIndex: 'coldName',
    },
    {
        title: '切换时间',
        dataIndex: 'currentMessage',
    },
    {
        title: '创建时间',
        dataIndex: 'openOffStatus',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="/cold/coldVarDetails">详情</a>
                <Divider type="vertical" />
                <a href="">删除</a>
            </span>
        ),
    },
];


const data = [
    {
        id: '1',
        coldName: '西门子变频空调',
        currentMessage: '2021-12-28',
        openOffStatus: '2021-06-26',
    },
    {
        id: '2',
        coldName: '开利变频空调',
        currentMessage: '2021-10-25',
        openOffStatus: '2021-07-12',
    },
    {
        id: '3',
        coldName: '海尔变频空调',
        currentMessage: '2021-10-31',
        openOffStatus: '2021-09-23',
    },
];


class StepsDemo extends React.Component {

  render() {
    const cardContent = '自然更换风冷 建议。。。。。。。。。。。。。。。。。。。。。。。。。'
    return (
      <div>
        <CustomBreadcrumb arr={['冷源', '自然风冷']}/>
        <TypingCard source={cardContent}/>
          <Table columns={columns} dataSource={data} />

      </div>
    )
  }
}

export default StepsDemo