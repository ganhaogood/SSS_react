import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './items.styl'
export default class Items extends Component {
  static propTypes = {
    ItemList: PropTypes.array.isRequired,
    classNames:PropTypes.string.isRequired
  }

  componentDidMount(){
    const BSbox =document.getElementById(this.props.classNames);
    this.newAndP=new BScroll(BSbox,{
      click: true,
      scrollX:true,
    });
  }
  render() {
    return (
      <div className="ItemWarp">
        <header className={`header ${this.props.classNames}`}>
          <a className={this.props.classNames==='newItemList'?'':'optimize'}>{/*"{optimize:className!=='newItemList'}"*/}
            {this.props.classNames==='newItemList'?<span>新品首发</span>:<span>人气推荐·好物精选</span>}
            <div>
              <span>
                <span>查看全部</span>
              </span>
            </div>
          </a>
        </header>
        <div id={this.props.classNames} className="ItemList">
          <ul>
            {
              this.props.ItemList.map((item,index)=>(
                <li key={index}>
                  <a>
                    <div className="img-warp">
                      <img src={item.listPicUrl}/>
                    </div>
                    <div className="item-name">
                  <span>
                    {item.name}
                  </span>
                    </div>
                    <div className="item-desc">
                      {item.simpleDesc}
                    </div>
                    <div className="item-price">￥{item.retailPrice}</div>
                  </a>
                </li>
              ))
            }
            <li className="item-more">
              查看全部
            </li>
          </ul>
        </div>
      </div>
    )
  }
}