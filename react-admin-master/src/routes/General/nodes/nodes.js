import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';


const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '规格类型',
        dataIndex: 'role',
    },
    {
        title: '处理器',
        dataIndex: 'cpu',
    },
    {
        title: '存储',
        dataIndex: 'memory',
    },
    {
        title: '动力',
        dataIndex: 'engine',
    },
    {
        title: 'ID地址',
        dataIndex: 'address',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => (
            text == "ready" ? <Tag color="green">ready</Tag> :  <Tag color="red">offhand</Tag>
        ),
    },
    {
        title: '运行情况',
        dataIndex: 'availability',
        render: (text, record) => (
            text == "active" ? <Tag color="green">active</Tag> :  <Tag color="red">inactive</Tag>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
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
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}

export default nodes