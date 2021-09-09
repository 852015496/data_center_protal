import React from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';


const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '堆栈',
    dataIndex: 'stack',
  },
  {
    title: '形象',
    dataIndex: 'image',
  },
  {
    title: '调整模式',
    dataIndex: 'mode',
  },
  {
    title: '发布端口',
    dataIndex: 'port',
  },
  {
    title: '最后一次更新时间',
    dataIndex: 'update',
  },
  {
    title: '所有权',
    key: 'ownership',
    // render: (text, record) => (
    //     <span>
    //     <a>Invite {record.name}</a>
    //     <Divider type="vertical" />
    //     <a>Delete</a>
    //   </span>
    // ),
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


class service extends React.Component {

  state = {
    data:[],
    Endpoint:{},
    Ports:{}
  }

  serviceList = () => {
    axios.get('http://139.219.10.137:2375/services').then((response) => {
      let data =[];
      for (let i = 0; i < response.data.length; i++) {
        console.log({ "port":response.data[i].Endpoint.Spec.Ports})
        data.push({
          "update": response.data[i].UpdatedAt,"name":response.data[i].Spec.Name,"image":response.data[i].PreviousSpec.TaskTemplate.ContainerSpec.Image,
          "port":response.data[i].Endpoint.Spec.Ports[0].PublishedPort + ":" + response.data[i].Endpoint.Spec.Ports[1].PublishedPort
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

export default service