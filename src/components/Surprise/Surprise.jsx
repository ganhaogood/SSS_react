import React, {Component} from 'react'
import './surprise.styl'
import PropTypes from 'prop-types'

export default class Surprise extends Component {
  static propTypes = {
    surprise: PropTypes.object.isRequired
  };

  render() {
    const {surprise}=this.props
    return (
      <a className="surprise">
        <div className="imgWarp">
          {
            surprise.picList?(
              <div className="leftWrap">
                <div className="left-img" style={{backgroundImage:`url(${surprise.picList[0]})`}}></div>
                <div className="right-img">
                  <div className="up" style={{backgroundImage:`url(${surprise.picList[1]})`}}></div>
                  <div className="down" style={{backgroundImage:`url(${surprise.picList[2]})`}}></div>
                </div>
              </div>
            ):<div className="one-img" style={{backgroundImage:`url(${surprise.itemPicUrl})`}}></div>
          }


        </div>
        <div className="desc">{surprise.title ? surprise.title : surprise.content}</div>
      </a>
    )
  }
}