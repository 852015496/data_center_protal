import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';


const columns = [
  {
    title: '配置名称',
    dataIndex: 'configname',
  },
  {
    title: '配置参数',
    dataIndex: 'configvalue',
  },
  {
    title: '机房空调',
    dataIndex: 'refHavcsetEntity.name',
  },
  {
    title: '空调类型',
    dataIndex: 'refHavcsetEntity.refHavcmetaEntity.brand',
  },
  {
    title: '操作',
    dataIndex: 'active',
    render: (text, record) => (
        <span size="middle">
          <a>默认</a>
          <Divider type="vertical" />
          <a>全开</a>
          <Divider type="vertical" />
         <a>全自动</a>
        </span>
    ),


  },
];



class havccmd extends React.Component {

  state = {
    data:[],
    Endpoint:{},
    Ports:{}
  }

  havcList = () => {
    axios.get('http://localhost:8080/havccmd/list').then((response) => {
      var data = response.data.content
      console.log(data)
      this.setState({
        data:data
      })
    })
  }


  componentDidMount() {
    this.havcList();
  }

  render() {
    return (
        <div>
          <Table columns={columns} dataSource={this.state.data} />
        </div>
    )
  }
}

export default havccmd