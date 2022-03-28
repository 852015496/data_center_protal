import React from 'react'
import { Table, Divider, Tag,Badge,Switch } from 'antd';
import axios from 'axios';
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";


const columns = [
    {
        title: '设备名称',
        dataIndex: 'job',
    },
    {
        title: 'IP地址',
        dataIndex: 'instance',
    },
    {
        title: '监听设备',
        dataIndex: 'hostname',
    },
    {
        title: '机房编号',
        dataIndex: 'regionid',
    },
    // {
    //     title: '设备状态',
    //     dataIndex: 'PStatus',
    //     render: (text, record) => (
    //         text == 1 ? <Tag color="green">running</Tag> :  <Tag color="red">stopped</Tag>
    //     ),
    // },
    // {
    //     title: '告警状态',
    //     dataIndex: 'JNType',
    //     render: (text, record) => (
    //         text == 1 ?  <Badge status="error" /> : <Badge status="success" />
    //     ),
    // },
    // {
    //     title: '运行时间',
    //     dataIndex: 'PTime',
    // },
    // {
    //     title: '节能类型',
    //     dataIndex: 'JNType',
    //     render: (text, record) => (
    //         text == 1 ? <Tag color="green">running</Tag> :  <Tag color="red">stopped</Tag>
    //     ),
    // },
    {
        title: '操作',
        dataIndex: 'availability',
        render: (text, record) => (
            <span>
        <a href="/home/systemHeakthAndStatusMonitor">详情</a>
      </span>
        ),
    },
    // {
    //     title: '急停',
    //     dataIndex: 'status',
    //     render: (record,text) => {
    //         return (
    //             <div>
    //                 {
    //                     text === 1 ? <Switch defaultChecked={false} onChange={onChange}/> : <Switch defaultChecked={true} onChange={onChange}/>
    //                 }

    //             </div>
    //         );
    //     },
    // },
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
        status: <Switch defaultChecked onChange={onChange} />
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
        status: <Switch defaultChecked onChange={onChange} />
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
        status: <Switch defaultChecked onChange={onChange} />
    },
];

function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

class region extends React.Component {

    state = {
        prometheusData:[],
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
    
    prometheusList = () => {
        axios.get('http://localhost:8080/doget?urlstring=http://192.168.1.124:9090/api/v1/targets').then((response) => {
            // console.log(response);
            let data =[];
            for (let i = 0; i < response.data.data.activeTargets.length; i++) {
                data.push(response.data.data.activeTargets[i].labels);
                this.setState({
                    prometheusData:data
                })
                // console.log(this.state.prometheusData)
            }
        })
    }

    componentDidMount() {
        this.serviceList();
        this.prometheusList();
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['维护管理', '设备列表']}/>
                <Table columns={columns} dataSource={this.state.prometheusData} />
            </div>
        )
    }
}

export default region