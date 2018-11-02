import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './minorPosItem.styl'

export default class MinorPosItem extends Component {
  static propTypes = {
    minor: PropTypes.object.isRequired
  };

  render() {
    const {minor}=this.props
    return (
      <a className="minorPosItem" href="javascript:;">
        <div className="topicInfo">
          <div className="author">
            <div className="avatar">
              <img src={minor.avatar}/>
            </div>
            <div className="nickname">{minor.nickname}</div>
          </div>
          <div className="line1">
            {minor.title}
          </div>
          <div className="line2">
            {minor.subTitle}
          </div>
        </div>
        <div className="minorPic" style={{backgroundImage:`url(${minor.picUrl})`}}>
          <div className="topicTag">
            <div className="tag">{minor.typeName}</div>
          </div>
        </div>
      </a>
    )
  }
}