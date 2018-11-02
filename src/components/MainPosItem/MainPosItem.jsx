import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './mainPosItem.styl'
export default class MainPosItem extends Component {
  static propTypes = {
    main: PropTypes.object.isRequired
  };
  render() {
    const {main}=this.props
    return (
      <a className="mainPosItem" href="javascript:;" v-if="main">
        <div className="imgContiner" style={{backgroundImage: `url(${main.picUrl})`}}>
          <div className="topicTag">
            <div className="tag">{main.nickname}</div>
          </div>
        </div>
        <div className="topicInfo">
          <div className="line1">
            <div className="desc">{main.title}</div>
            <div className="price">{main.priceInfo}元起</div>
          </div>
          <div className="line2">
            {main.subTitle}
          </div>
        </div>
      </a>
    )
  }
}