import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";


const columns = [
    {
        title: '设备类型',
        dataIndex: 'PType',
    },
    {
        title: '设备名称',
        dataIndex: 'job',
    },
    {
        title: '设备ID',
        dataIndex: '',
    },
    {
        title: 'IP地址',
        dataIndex: 'IPAddress',
    },
    {
        title: '设备状态',
        dataIndex: 'PStatus',
        render: (text, record) => (
            text == 1 ? <Tag color="green">running</Tag> :  <Tag color="red">stopped</Tag>
        ),
    },
    {
        title: '运行时间',
        dataIndex: 'PTime',
    },
    {
        title: '节能类型',
        dataIndex: 'JNType',
        render: (text, record) => (
            text == 1 ? <Tag color="green">running</Tag> :  <Tag color="red">stopped</Tag>
        ),
    },
    {
        title: '操作',
        dataIndex: 'availability',
        render: (text, record) => (
            <span>
        <a href="/home/systemHeakthAndStatusMonitor">详情</a>
      </span>
        ),
    },
];

const data = [
    {
        key: '1',
        PType: 'PLC',
        PName: "西门子",
        PID: 'PA0001',
        PIP: '192.168.1.101',
        PStatus: 1,
        PTime: '2021-12-03',
        JNType: 1,
    },
    {
        key: '2',
        PType: 'PLC',
        PName: "西门子",
        PID: 'PA0001',
        PIP: '192.168.1.101',
        PStatus: 1,
        PTime: '2021-12-03',
        JNType: 1,
    },
    {
        key: '3',
        PType: 'PLC',
        PName: "西门子",
        PID: 'PA0001',
        PIP: '192.168.1.101',
        PStatus: 1,
        PTime: '2021-12-03',
        JNType: 1,
    },
];


class region extends React.Component {

    state = {
        data:[],
        Endpoint:{},
        Ports:{}
    }

    serviceList = () => {
        axios.get('http://192.168.1.153:8080/region/list').then((response) => {
            var data = response.data.content
            this.setState({
                data:data
            })
        })
    }
    serviceList = () => {
        axios.get('http://192.168.1.174:9090/api/v1/query?query=process_start_time_seconds{job="node"}').then((response) => {
            console.log(response);
            let data =[];
            for (let i = 0; i < response.data.data.result.length; i++) {
                // console.log({ "cpu":response.data.data.result[i].metric.cpu})
                // console.log({ "job":response.data.data.result[i].metric.job})
                // console.log({ "value":response.data.data.result[i].value})
                data.push({
                    "IPAddress": response.data.data.result[i].metric.instance,"job":response.data.data.result[i].metric.hostname,
                    // "value":response.data.data.result[i].value[0],"value2":response.data.data.result[i].value[1],
                });
                // console.log(data)
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
                <CustomBreadcrumb arr={['维护管理', '设备列表']}/>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}

export default region