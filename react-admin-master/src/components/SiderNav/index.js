import React from 'react'
import CustomMenu from "../CustomMenu/index";
import logo from "../../assets/img/yunchuang_logo.png"

const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '仪表盘',
    icon: 'dashboard',
    key: '/home/other',
    subs: [
      {key: '/home/general/button', title: '数据中心对象关系展示', icon: ''},
      {key: '/home/navigation/menu', title: '冷水机组', icon: ''},
      {key: '/home/navigation/steps', title: '机房', icon: ''},
    ]
  },
  {
    title: '服务集群',
    icon: 'appstore',
    key: '/home/general',
    subs: [
      {key: '/home/general/icon', title: '服务', icon: '',},
      {key: '/home/general/nodes', title: '节点', icon: '',},
    ]
  },
  {
    title: '机房管理',
    icon: 'database',
    key: '/home/navigation',
    subs: [
      {key: '/home/navigation/region', title: '机房信息', icon: ''},
    ]
  },
  {
    title: '策略管理',
    icon: 'edit',
    key: '/home/entry',
    subs: [
      {key: '/home/entry/upload', title: '策略列表', icon: ''},
      {key: '/home/navigation/tabs', title: '策略审计', icon: ''},
    ]
  },
  {
    title: '告警管理',
    icon: 'disconnect',
    key: '/home/display',
    subs: [
      {key: '/home/display/carousel', title: '设备告警', icon: ''},
      {key: '/home/display/collapse', title: ' 信息告警', icon: ''},
      {key: '/home/display/list', title: '通知方式', icon: ''},
    ]
  },
  {
    title: '维护管理',
    icon: 'info-circle-o',
    key: '/home/feedback',
    subs: [
      {key: '/home/feedback/modal', title: '审计日志', icon: '',},
      {key: '/home/feedback/notification', title: '设备日志', icon: ''},
      // {key: '/home/feedback/spin', title: '加载中', icon: '',}
    ]
  },
  {
    title: '人工操作',
    icon: 'team',
    key: '/home/people',
    subs: [
      {key: '/home/other/animation', title: '人工操作', icon: '',},
    ]
  },
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
  {
    title: '系统管理',
    icon: 'setting',
    key: '/home/about'
  }
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