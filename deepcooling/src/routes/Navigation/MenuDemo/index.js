import React from 'react'
import {Card, Col, Row, Menu, Icon, Switch,Table, Tag, Space,Divider} from 'antd'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import TypingCard from '../../../components/TypingCard'


const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    render: (text,record) => (
      <span>
        <a>增加</a>
        <Divider type="vertical" />
        <a>编辑</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
       
    ),
  },
];

const data = [
  {
    id: '1',
    name: 'admin',
    createTime: "2022-03-29 15:25:28",
  },
  {
  
    id: '2',
    name: 'admin1',
    createTime: "2022-03-29 15:25:28",
  },
  {
   
    id: '3',
    name: 'root',
    createTime: "2022-03-29 15:25:28",
  },
];


class MenuDemo extends React.Component {
  state = {
    openKey: '',
    theme: 'light',
    mode: 'horizontal'
  }

  changeTheme = (checked) => {
    this.setState({
      theme: checked ? 'dark' : 'light'
    })
  }
  changeMode = (checked) => {
    this.setState({
      mode: checked ? 'inline' : 'horizontal'
    })
  }

  render() {
    const cardContent = ' 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。'
    return (
      <div>
        <CustomBreadcrumb arr={['系统管理','用户管理']}/>
        {/* <TypingCard source={cardContent} height={164}/> */}
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

const styles = {
  Item:{
    height:190,
    marginBottom:10,
    borderRadius: 3,
  }
}

export default MenuDemo