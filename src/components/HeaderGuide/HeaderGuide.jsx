import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './headerGuide.styl'
export default class HeaderGuide extends Component {
  render() {
    return (
      <div className="headerContiner">
        <div className="headerWarp">
          <NavLink to="/home" className="home-icon" href="javascript:;"></NavLink>
          <NavLink to="/home" className="logoWarp" href="javascript:;">
            <i className="logo-icon"></i>
          </NavLink>
          <div className="rightWarp">
            <a className="searchWarp" href="javascript:;">
              <i className="search-icon"></i>
            </a>
            <NavLink to="/shopchart" className="shopcarWarp" href="javascript:;">
              <i className="shop-icon"></i>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}