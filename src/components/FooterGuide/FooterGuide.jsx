import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './footerGuide.styl'
import PropTypes from 'prop-types'
export default class FooterGuide extends Component {
  static propTypes = {
    path:PropTypes.string
  };
  render() {
    return (
      <footer className="footer_guide border-1px">
        <NavLink to="/home" className={this.props.path==='/home'?"guide_item on" :"guide_item" }>
          <span className="item_icon">
            <i className="iconfont icon-home"></i>
          </span>
          <span>首页</span>
        </NavLink>
        <NavLink to="/optimize" className={this.props.path==='/optimize'?"guide_item on" :"guide_item" }>
          <span className="item_icon">
              <i className="iconfont icon-shiwu"></i>
          </span>
          <span>识物</span>
        </NavLink>
        <NavLink to="/category" className={this.props.path==='/category'?"guide_item on" :"guide_item" }>
          <span className="item_icon">
              <i className="iconfont icon-navicon-kcfl"></i>
          </span>
          <span>分类</span>
        </NavLink>
        <NavLink to="/shopchart" className={this.props.path==='/shopchart'?"guide_item on" :"guide_item" }>
          <span className="item_icon">
            <i className="iconfont icon-gouwuche2"></i>
          </span>
          <span>购物车</span>
        </NavLink>
        <NavLink to="/personal" className={this.props.path==='/personal'?"guide_item on" :"guide_item" }>
          <span className="item_icon">
            <i className="iconfont icon-mine"></i>
          </span>
          <span>个人</span>
        </NavLink>
      </footer>
    )
  }
}