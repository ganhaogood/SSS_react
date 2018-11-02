import React,{Component} from 'react'
import './Interlayer.styl'

export default class Interlayer extends Component {
  goto=()=>{
    this.props.history.replace('/home')
  }
  render(){
    return(
      <div className="g-bd">
        <div className="g-row">
          <img src="//yanxuan.nosdn.127.net/53df1ead033706dcd7da9a91c8977b83.jpg"/>
          <img src="//yanxuan.nosdn.127.net/143424244e87fb8eed45c6984c769a63.jpg"/>
        </div>
        <div className="g-row">
          <img src="//yanxuan.nosdn.127.net/d600f8c56fc184e199aa389e09fb2ff9.jpg"/>
          <span className="downloadBtn"></span>
          <a href="javascript:;" className="backWapBtn" onClick={this.goto}></a>
        </div>
      </div>
    )
  }
}