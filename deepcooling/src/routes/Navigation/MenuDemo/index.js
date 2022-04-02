import React,{useState} from 'react'
import {Card, Col, Row, Menu, Icon, Switch,Table, Tag, Space,Divider,Modal,Form,layout,Input, message} from 'antd'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import TypingCard from '../../../components/TypingCard'
import axios from 'axios';

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

@Form.create()
class MenuDemo extends React.Component {

  constructor(props) {
    super(props);
  }
  
  state = {
    openKey: '',
    theme: 'light',
    mode: 'horizontal',
    userArr:"",
    visible: false 
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    e.preventDefault();
        this.props.form.validateFields((errors,values) =>{
            console.log(errors);
            if (!errors) {
                console.log(values);
                if(values.password != values.newPassword){
                  message.error("输入密码不一致，请重新输入！")
                }
                axios.post('http://localhost:8080/userLogin/register', {
                    username:values.username,
                    password:values.password,
                }).then((response) => {
                    console.log(response);
                    if(response.data.msg == "300"){
                      message.error("用户名已存在，请重新输入！")
                    }
                    if(response.data.msg == "200"){
                      message.success("用户添加成功");
                    }
                    this.onCancel();
                    this.getByUserList()
                })
            }
        })
    this.setState({
      visible: false,
    });
  };


  onCancel = () => {
    this.props.form.resetFields();
    // this.props.toggleVisible(false);
};

showConfirm =(text,record)=> {
  console.log(text.username)
  Modal.confirm({
    title: '删除用户',
    content: '确定要删除此用户吗？',
    onOk :() => {
      axios.post('http://localhost:8080/userLogin/deleteByName', {
                   username:text.username
                }).then((response)=>{
                  console.log(record.concentId);
                  console.log(response);
                  message.success('删除成功');
                  this.getByUserList()
                })
      // return new Promise((resolve, reject) => {
      //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      // }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

  handleCancel = e => {
    e.preventDefault();
    console.log(e);
    
    this.setState({
      visible: false,
    });
  };

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



  componentDidMount (){
    this.getByUserList();
   }

   getByUserList =()=>{
     axios.get('http://localhost:8080/userLogin/getUser').then((resp) => {
       console.log(resp);
       let ids = 0;
       this.setState({
         userArr:resp.data
       })
     })
   }

  render() {

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text,record) => (
          <span>
            <a onClick={this.showModal}>增加</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a onClick = {this.showConfirm.bind(text,record)}>删除</a>
          </span>
           
        ),
      },
    ];

    const { getFieldDecorator, getFieldError } = this.props.form;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const cardContent = ' 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。'
    return (
      <div>
        <CustomBreadcrumb arr={['系统管理','用户管理']}/>
        {/* <TypingCard source={cardContent} height={164}/> */}
        <Table columns={columns} dataSource={this.state.userArr} />
        <Modal
          title="添加新用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...layout} name="control-hooks">
                <Form.Item label="用户名:">
                    {getFieldDecorator('username',{
                        validateFirst:true,
                        rules:[
                            {required:true,message:'请输入用户名'},
                            {pattern: '^[^ ]+$', message: '不能输入空格'},
                        //     {pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字' }
                        ]
                    })
                    (<Input  placeholder="请输入" style={{width:'200px',height:'32px'}}/>)
                    }
              </Form.Item>
              <Form.Item label="密码:">
                    {getFieldDecorator('password',{
                        validateFirst:true,
                        rules:[
                            {required:true,message:'请输入密码'},
                            {pattern: '^[^ ]+$', message: '不能输入空格'},
                            // {pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字' }
                        ]
                    })
                    (<Input  placeholder="请输入" style={{width:'200px',height:'32px'}}/>)
                    }
              </Form.Item>
              <Form.Item label="确认密码:">
                    {getFieldDecorator('newPassword',{
                        validateFirst:true,
                        rules:[
                            {required:true,message:'请输入确认密码'},
                            {pattern: '^[^ ]+$', message: '不能输入空格'},
                            // {pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字' }
                        ]
                    })
                    (<Input  placeholder="请输入" style={{width:'200px',height:'32px'}}/>)
                    }
              </Form.Item>
            </Form>
        </Modal>
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