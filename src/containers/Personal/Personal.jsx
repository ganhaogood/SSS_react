import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import HeaderGuide from '../../components/HeaderGuide/HeaderGuide'
import './personal.styl'
export default class Personal extends Component {
  state={
    showPage:false,//是否显示登录界面，默认不显示
    isPhone:true,//是否是手机登录
    showSendCode:false//短信验证还是密码登录，默认是密码
  };
  // 登录方式
  loginWay(way){
    this.setState({
      isPhone:way,
      showPage:true,
      showSendCode:false
    })
  };
  otherWay(){
    this.setState({
      showPage:false
    })
  };
  changMethod(){
    const showSendCode=!this.state.showSendCode
    this.setState({
      showSendCode
    })
  }
  login=()=>{

    if(this.state.isPhone){//手机登录验证
      if(!/^1\d{10}$/.test(this.phoneInput.value)){
        alert('请输入正确的手机号')
      }else if(!this.state.showSendCode){
        if(!this.pwdInput.value){
          alert('请输入密码')
        }else {
          this.props.history.replace('/home')
        }
      }else{
        if(!/^.{4}$/.test(this.pwd1Input.value)){
          alert('请输入正确的验证码')
        }else {
          this.props.history.replace('/home')
        }
      }
    }else {//邮箱登录
      if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.mailInput.value)){
        alert('请输入正确的邮箱')
      }else{
        if(!this.pwdInput.value){
          alert('请输入密码')
        }else {
          this.props.history.replace('/home')
        }
      }
    }
  }
  render() {
    return (
      <div className="loginContiner">
        <HeaderGuide className="header"/>
        {
          !this.state.showPage?(
            <div className="loginTypesWrap">
              <div className="typesWarp">
                <div className="logoWarp">
                  <img src="//yanxuan.nosdn.127.net/bd139d2c42205f749cd4ab78fa3d6c60.png"/>
                </div>
                <div className="btnWarp">
                  <div className="loginPhone-button redBtn">
                    <i className="icon-loginPhone"></i>
                    <span onClick={()=>this.loginWay(true)} >手机号码登录</span>
                  </div>
                  <div className="loginMail-button writeBtn">
                    <i className="icon-loginMail" data-reactid=".0.1.0.1.1.1.0"></i>
                    <span onClick={()=>this.loginWay(false)}>邮箱帐号登录</span>
                  </div>
                  <div className="register-button">
                    <span>手机号快捷注册</span>
                    <i className="icon-arrow-right"></i>
                  </div>
                </div>
                <div className="partnerWarp">
                  <div className="itemWarp">
                    <span className="item">
                      <i className="iconfont icon-weixin"></i>
                      <span className="name">微信</span>
                    </span>
                  </div>
                  <div className="itemWarp middleWarp">
                    <span className="item">
                      <i className="iconfont icon-qq"></i>
                      <span className="name">QQ</span>
                    </span>
                  </div>
                  <div className="itemWarp">
                    <span className="item">
                      <i className="iconfont icon-weibo"></i>
                      <span className="name">微博</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ):(
            <div className="loginTypes">
              <div className="phoneLogin fromContiner">
                <div className="logo">
                  <img src="//yanxuan.nosdn.127.net/bd139d2c42205f749cd4ab78fa3d6c60.png"/>
                </div>
                <div className="userForm">
                  <div className="inputWarp">
                    {
                      !this.state.isPhone?<input type="text" className="mail" placeholder="邮箱账号" ref={input => this.mailInput = input}/>:
                        <input type="text" className="phone" placeholder="请输入手机号" maxLength="11" ref={input => this.phoneInput = input}/>
                    }
                  </div>
                  <div className="inputWarp">
                    {
                      !this.state.showSendCode?(<input type="password" className="password" placeholder="请输入密码"  ref={input => this.pwdInput = input}/>):(
                        <input type="password" className="password" placeholder= '请输入短信验证码' ref={input => this.pwd1Input = input}/>)
                    }
                    {this.state.showSendCode&&this.state.isPhone?<a className="sendCode">获取验证码</a>:null}
                  </div>
                  <div className="switchTypes smallWrod">
                    <span className="forgetPassword small">
                      {this.state.isPhone? '忘记密码？' : '注册账号'}
                    </span>
                    {
                      this.state.isPhone?
                        (<span className="useSMS" onClick={()=>this.changMethod()}>使用{this.state.showSendCode? '密码' : '短信'}验证登录</span>)
                        :
                        (<span className="useSMS">忘记密码？</span>)
                    }
                  </div>
                  <div className="loginBtnWarp">
                    <div className="login-button redBtn">
                      <span onClick={()=>this.login()}>登录</span>
                    </div>
                    <div className="login-otherTypes writeBtn">
                      <span onClick={()=>this.otherWay()}>其他登录方式</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}