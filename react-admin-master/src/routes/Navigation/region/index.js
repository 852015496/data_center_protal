import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";


const columns = [
    {
        title: '数据中心',
        dataIndex: 'refBuildingEntity.refDatacenterEntity.name',
    },
    {
        title: '楼号',
        dataIndex: 'refBuildingEntity.bldname',
    },
    {
        title: '房间号',
        dataIndex: 'name',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => (
            text == 1 ? <Tag color="green">running</Tag> :  <Tag color="red">stopped</Tag>
        ),
    },
    {
        title: '操作',
        dataIndex: 'availability',
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


    componentDidMount() {
        this.serviceList();
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['机房管理', '机房信息']}/>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}

export default region