import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'
import axios from 'axios'

//首页
const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//冷源/冷机设备列表
const coldVarList = LoadableComponent(()=>import('../../routes/General/nodes/index'))
//冷机设备详情
const coldDetails = LoadableComponent(()=>import('../../routes/Other/AnimationDemo/index'))
//冷却装置信息
const coldConfigList = LoadableComponent(()=>import('../../routes/General/nodes/nodes'))
//冷却装置详情
const coldConfigDetails = LoadableComponent(()=>import('../../routes/Other/DraftDemo/index'))
//自然风冷
const naturalCold = LoadableComponent(()=>import('../../routes/Navigation/StepsDemo/index'))


//机房列表
const regionMessage = LoadableComponent(()=>import('../../routes/Other/SpringText/index'))
//空调详情
const AirRootList = LoadableComponent(()=>import('../../routes/Display/TableDemo/index'))
//具体空调工况及控制信息
const AiRootMessage = LoadableComponent(()=>import('../../routes/Other/AnimationDemo/index'))

//用户权限管理
const userAndAuthority = LoadableComponent(()=>import('../../routes/Navigation/MenuDemo/index'))
//远程登陆设置
const remoteLoginSetting = LoadableComponent(()=>import('../../routes/Entry/FormDemo/FormDemo1'))
//审计日志
const auditLogs = LoadableComponent(()=>import('../../routes/Entry/FormDemo/FormDemo2'))

//设备列表
const equipmentList = LoadableComponent(()=>import('../../routes/Navigation/region/index'))
// const equipmentList = LoadableComponent(()=>import('../../routes/Feedback/SpinDemo/index'))
//告警管理
const CarouselDemo = LoadableComponent(()=>import('../../routes/Display/AlarmLog/index'))

//系统监控和状态监控
const systemHeakthAndStatusMonitor = LoadableComponent(()=>import('../../routes/General/service/index'))
//空调参数默认参数
const AirRootDefault = LoadableComponent(()=>import('../../routes/Entry/Havccmd/index'))





//节点
const nodess = LoadableComponent(()=>import('../../routes/General/nodes/nodes'))



// const alarmManagerment = LoadableComponent(()=>import('../../routes/Feedback/ModalDemo/index'))
// const systemHeakthAndStatusMonitor = LoadableComponent(()=>import('../../routes/General/nodes/nodes'))
const CollapseDemo = LoadableComponent(()=>import('../../routes/Display/CollapseDemo/index'))
const ListDemo = LoadableComponent(()=>import('../../routes/Display/ListDemo/index'))
const TableDemo = LoadableComponent(()=>import('../../routes/Display/TableDemo/index'))
const TabsDemo = LoadableComponent(()=>import('../../routes/Display/TabsDemo/index'))

//图表
const charts = LoadableComponent(()=>import('../../routes/Other/ChartDemo/index'))

//其它


const GalleryDemo = LoadableComponent(()=>import('../../routes/Other/GalleryDemo/index'))
const DraftDemo = LoadableComponent(()=>import('../../routes/Other/DraftDemo/index'))
const LoadingDemo = LoadableComponent(()=>import('../../routes/Other/LoadingDemo/index'))
const ErrorPage = LoadableComponent(()=>import('../../routes/Other/ErrorPage/index'))
const SpringText = LoadableComponent(()=>import('../../routes/Other/SpringText/index'))

//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {


  state ={
    super:{
      regionNmame:''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8080/region/getRegionList').then((resp) => {
      console.log(resp);
      for(let j =0;j<resp.data.length; j++){
        var regionName = resp.data[j].name;
      }
    })
  }
  render () {
    const regionName = regionName;
    console.log(regionName)
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          {/*首页*/}
          <PrivateRoute exact path='/home' component={Home}/>
          {/*冷源*/}
          <PrivateRoute exact path='/cold/coldVarList' component={coldVarList}/>
          <PrivateRoute exact path='/cold/coldVarDetails' component={coldDetails}/>
          <PrivateRoute exact path='/cold/coldConfigList' component={coldConfigList}/>
          <PrivateRoute exact path='/cold/coldConfigDetails' component={coldConfigDetails}/>
          <PrivateRoute exact path='/cold/naturalCold' component={naturalCold}/>
          {/*机房*/}
          <PrivateRoute exact path='/region/regionMessage/3223机房' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/102号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/103号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/201号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/202号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/203号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/301号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/302号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/303号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/401号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/402号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/403号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/501号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/502号机楼' component={regionMessage}/>
          <PrivateRoute exact path='/region/regionMessage/503号机楼' component={regionMessage}/>
          {/* <PrivateRoute exact path='/region/regionSurvey' component={regionSurvey}/> */}
          {/* 机房详情 */}
          <PrivateRoute exact path='/region/AirRootList' component={AirRootList}/>
          <PrivateRoute exact path='/region/AiRootMessage' component={AiRootMessage}/>
          {/*系统管理*/}
          <PrivateRoute exact path='/systemManagement/userAndAuthority' component={userAndAuthority}/>
          <PrivateRoute exact path='/systemManagement/remoteLoginSetting' component={remoteLoginSetting}/>
          <PrivateRoute exact path='/systemManagement/auditLogs' component={auditLogs}/>
          {/*维护管理*/}
          <PrivateRoute exact path='/defend/equipmentList' component={equipmentList}/>
          <PrivateRoute exact path='/defend/alarmManagerment' component={CarouselDemo}/>
          <PrivateRoute exact path='/home/systemHeakthAndStatusMonitor' component={systemHeakthAndStatusMonitor}/>
          <PrivateRoute exact path='/home/AirRootDefault' component={AirRootDefault}/>

          {/*<PrivateRoute exact path='/home/feedback/modal' component={ModalDemo}/>*/}
          {/*<PrivateRoute exact path='/home/feedback/notification' component={NotificationDemo}/>*/}
          {/*<PrivateRoute exact path='/home/feedback/spin' component={SpinDemo}/>*/}

          <PrivateRoute exact path='/home/other/gallery' component={GalleryDemo}/>
          <PrivateRoute exact path='/home/other/draft' component={DraftDemo}/>
          <PrivateRoute exact path='/home/other/loading' component={LoadingDemo}/>
          <PrivateRoute exact path='/home/other/404' component={ErrorPage}/>
          <PrivateRoute exact path='/home/other/springText' component={SpringText}/>

          <PrivateRoute exact path='/home/about' component={About}/>

          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain