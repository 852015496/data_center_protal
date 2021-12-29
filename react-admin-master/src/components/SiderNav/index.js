import React from 'react'
import CustomMenu from "../CustomMenu/index";
import logo from "../../assets/img/yunchuang_logo.png"

const menus = [
  // {
  //   title: '首页',
  //   icon: 'home',
  //   key: '/home'
  // },
  {
    title: '首页',
    icon: 'home',
    key: '/home',
    // subs: [
    //   {key: '/home/general/button', title: '数据中心对象关系展示', icon: ''},
    //   {key: '/home/navigation/menu', title: '冷水机组', icon: ''},
    //   {key: '/home/navigation/steps', title: '机房', icon: ''},
    // ]
  },
  {
    title: '冷源',
    icon: 'ellipsis',
    key: '/cold',
    subs: [
      {key: '/cold/coldVarList', title: '冷机设备列表', icon: ''},
      {key: '/cold/coldConfigList', title: '冷却装置信息', icon: ''},
      {key: '/cold/naturalCold', title: '自然风冷', icon: ''},
    ]
  },
  {
    title: '机房管理',
    icon: 'database',
    key: '/region',
    subs: [
      {key: '/region/regionMessage', title: '机房信息', icon: ''},
      {key: '/region/regionSurvey', title: '机房概况', icon: ''},
      {key: '/region/AiRootMessage', title: '具体空调工况及控制信息', icon: ''},
    ]
  },
  {
    title: '系统管理',
    icon: 'setting',
    key: '/systemManagement',
    subs: [
      {key: '/systemManagement/userAndAuthority', title: '用户和权限管理', icon: '',},
      {key: '/systemManagement/remoteLoginSetting', title: '远程登陆设置', icon: '',},
      {key: '/systemManagement/auditLogs', title: '审计日志', icon: '',},
    ]
  },
  {
    title: '维护管理',
    icon: 'global',
    key: '/defend',
    subs: [
      {key: '/defend/equipmentList', title: '设备列表', icon: '',},
      {key: '/defend/alarmManagerment', title: '告警管理', icon: ''},
      {key: '/home/systemHeakthAndStatusMonitor', title: '系统健康和状态监控', icon: '',},
      {key: '/home/AirRootDefault', title: '空调恢复默认参数', icon: ''},
    ]
  },
  // {
  //   title: '人工操作',
  //   icon: 'team',
  //   key: '/home/people',
  //   subs: [
  //     {key: '/home/other/animation', title: '人工操作', icon: '',},
  //   ]
  // },
  // {
  //   title: '人工操作',
  //   icon: 'bulb',
  //   key: '/home/other',
  //   subs:[
  //     {key: '/home/other/animation', title: '人工操作', icon: '',},
      // {key: '/home/other/gallery', title: '画廊', icon: '',},
      // {key:'/home/other/draft',title:'富文本',icon:''},
      // {key:'/home/other/chart',title:'图表',icon:''},
      // {key:'/home/other/loading',title:'加载动画',icon:''},
      // {key:'/home/other/404',title:'404',icon:''},
      // {key:'/home/other/springText',title:'弹性文字',icon:''},
    // ]
  // },
  // {
  //   title: '系统管理',
  //   icon: 'setting',
  //   key: '/home/about'
  // }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}><center><img src={logo}/></center></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    // background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav