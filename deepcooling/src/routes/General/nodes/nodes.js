import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import TypingCard from "../../../components/TypingCard";


const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '冷却泵',
        dataIndex: 'coldName',
    },
    {
        title: '冷却塔',
        dataIndex: 'currentMessage',
    },
    {
        title: '运行状态',
        dataIndex: 'openOffStatus',
        render: (text, record) => (
            text == "1" ? <Tag color="green">开</Tag> :  <Tag color="red">关</Tag>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
        <a href="/cold/coldConfigDetails">详情</a>
      </span>
        ),
    },
];

const data = [
    {
        id: '1',
        coldName: '西门子变频空调',
        currentMessage: 'This is ximenzikongtiao。。。。。',
        openOffStatus: '1',
    },
    {
        id: '2',
        coldName: '开利变频空调',
        currentMessage: 'This is kailikongtiao。。。。。',
        openOffStatus: '2',
    },
    {
        id: '3',
        coldName: '海尔变频空调',
        currentMessage: 'This is haierkongtiao。。。。。',
        openOffStatus: '1',
    },
];


class nodes extends React.Component {

    state = {
        data:[],
        Endpoint:{},
        Ports:{}
    }

    serviceList = () => {
        axios.get('http://139.219.10.137:2375/nodes').then((response) => {
            let data =[];
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                data.push({
                    "role":response.data[i].Spec.Role,"availability":response.data[i].Spec.Availability,"name":response.data[i].Description.Hostname,
                    "status":response.data[i].Status.State,"address":response.data[i].Status.Addr,"engine":response.data[i].Description.Engine.EngineVersion,
                    "cpu":response.data[i].Description.Resources.NanoCPUs,"memory":response.data[i].Description.Resources.MemoryBytes
                });
                console.log(data)
                this.setState({
                    data:data
                })
            }
        })
    }


    componentDidMount() {
        this.serviceList();
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['冷源','冷却装置信息']}/>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default nodes