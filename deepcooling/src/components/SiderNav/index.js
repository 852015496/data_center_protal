import React from 'react'
import CustomMenu from "../CustomMenu/index";
import logo from "../../assets/img/deepcooling.png"
import axios from 'axios'





class SiderNav extends React.Component {

  state = {
    buildingName:"",
    buildingArr:[],
    regionArr:[]
  }


  
toSiderNav = () => {
  axios.get('http://localhost:8080/building/getlistbyidc?idcId=105').then((response) => {
      console.log(response);
      axios.get('http://localhost:8080/region/getRegionList').then((resp) => {
        console.log(resp);
      let buildingArr = [];
      for (let i = 0; i < response.data.length; i++) {
        var buildingName = response.data[i].bldname;
        var id = response.data[i].id;
        let subs = [];
        for(let j =0;j<resp.data.length; j++){
          var regionName = resp.data[j].name;
          var bldid = resp.data[j].bldid;
          if (bldid == id){
            subs.push({
              key:`/region/regionMessage/${regionName}`,title:regionName,icon:'',
            })
            buildingArr.push({
              key: `/region/${buildingName}`, title: buildingName, icon: '',
              subs   
            })
          }
        }
      }
      this.setState({
        buildingArr:buildingArr
      })
    })
  })
}

componentDidMount(){
  this.toSiderNav();
}


  render() {

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
        title: '告警管理',
        icon: 'team',
        key: '/home/people',
        subs: [
          {key: '/defend/alarmManagerment', title: '告警信息', icon: '',},
        ]
      },
     
      {
        title: '机房管理',
        icon: 'database',
        key: '/region',
        subs: this.state.buildingArr 
        // [
        //   {
        //     key: '/region/1号机楼',
        //     title: '1号机楼',
        //     icon: '',
            // subs:[
            //   {key: '/region/regionMessage/101号机楼', title: '101机房', icon: ''},
            //   {key: '/region/regionMessage/102号机楼', title: '102机房', icon: ''},
            //   {key: '/region/regionMessage/103号机楼', title: '103机房', icon: ''},
            // ]
        //   },
        //   {
        //     key: '/region/2号机楼',
        //     title: '2号机楼',
        //     icon: '',
        //     subs:[
        //       {key: '/region/regionMessage/201号机楼', title: '201机房', icon: ''},
        //       {key: '/region/regionMessage/202号机楼', title: '202机房', icon: ''},
        //       {key: '/region/regionMessage/203号机楼', title: '203机房', icon: ''},
        //     ]
        //   },
        //   {
        //     key: '/region/3号机楼', 
        //     title: '3号机楼', 
        //     icon: '',
        //     subs:[
        //       {key: '/region/regionMessage/301号机楼', title: '301机房', icon: ''},
        //       {key: '/region/regionMessage/302号机楼', title: '302机房', icon: ''},
        //       {key: '/region/regionMessage/303号机楼', title: '303机房', icon: ''},
        //     ]
        //   },
        //   {
        //     key: '/region/4号机楼', 
        //     title: '4号机楼', 
        //     icon: '',
        //     subs:[
        //       {key: '/region/regionMessage/401号机楼', title: '401机房', icon: ''},
        //       {key: '/region/regionMessage/402号机楼', title: '402机房', icon: ''},
        //       {key: '/region/regionMessage/403号机楼', title: '403机房', icon: ''},
        //     ]
        //   },
        //   {
        //     key: '/region/5号机楼', 
        //     title: '5号机楼', 
        //     icon: '',
        //     subs:[
        //       {key: '/region/regionMessage/501号机楼', title: '501机房', icon: ''},
        //       {key: '/region/regionMessage/502号机楼', title: '502机房', icon: ''},
        //       {key: '/region/regionMessage/503号机楼', title: '503机房', icon: ''},
        //     ]
        //   },
         
        //   // {key: '/region/AirRootList', title: '空调列表', icon: ''},
        //   // {key: '/region/AiRootMessage', title: '空调工况及控制信息', icon: ''},
        // ]
      },
      // {
      //   title: '冷源',
      //   icon: 'ellipsis',
      //   key: '/cold',
      //   subs: [
      //     {key: '/cold/coldVarList', title: '冷机设备列表', icon: ''},
      //     {key: '/cold/coldConfigList', title: '冷却装置信息', icon: ''},
      //     // {key: '/cold/naturalCold', title: '自然风冷', icon: ''},
      //   ]
      // },
      {
        title: '边缘节点管理',
        icon: 'global',
        key: '/defend',
        subs: [
          {key: '/defend/equipmentList', title: '边缘节点列表', icon: '',},
          // {key: '/defend/alarmManagerment', title: '告警管理', icon: ''},
          // {key: '/home/systemHeakthAndStatusMonitor', title: '系统健康和状态监控', icon: '',},
          // {key: '/home/AirRootDefault', title: '空调恢复默认参数', icon: ''},
        ]
      },
      {
        title: '系统管理',
        icon: 'setting',
        key: '/systemManagement',
        subs: [
          {key: '/systemManagement/userAndAuthority', title: '用户管理', icon: '',},
          // {key: '/systemManagement/remoteLoginSetting', title: '远程登陆设置', icon: '',},
          // {key: '/systemManagement/auditLogs', title: '审计日志', icon: '',},
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
      // {
      //   title: '系统管理',
      //   icon: 'setting',
      //   key: '/home/about'
      // }
    ]
    
    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}>
          {/* <center><img src={logo}/></center> */}
          </div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    // background: 'rgba(255, 255, 255, .2)',
    background: 'rgb(0 21 41)',
    margin: '16px'
    // margin: '16px'
  }
}

export default SiderNav