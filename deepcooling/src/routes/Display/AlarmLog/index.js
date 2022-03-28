import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';


const columns = [
  {
    title: '告警时间',
    dataIndex: 'time',
  },
  {
    title: '房间ID',
    dataIndex: 'regionId',
  },
  {
    title: '处理状态',
    dataIndex: 'status',
    render: (text, record) => (
      text == 0 ? <Tag color="red">未处理</Tag> : <Tag color="green">已处理</Tag> 
    ),
  },
  {
    title: '告警类型',
    dataIndex: 'code',
  },
  {
    title: '告警信息',
    dataIndex: 'description',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'active',
    // render: (text, record) => (
    //     <span size="middle">
    //       <a>默认</a>
    //       <Divider type="vertical" />
    //       <a>全开</a>
    //       <Divider type="vertical" />
    //      <a>全自动</a>
    //     </span>
    // ),
  // },
];



class alarmlog extends React.Component {

  state = {
    data:[],
    Endpoint:{},
    Ports:{}
  }

  havcList = () => {
    axios.get('http://localhost:8080/warning/list').then((response) => {
      console.log(response)
      this.setState({
        data:response.data.content
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

export default alarmlog