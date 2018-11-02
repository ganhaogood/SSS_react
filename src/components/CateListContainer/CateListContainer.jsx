import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './cateListContainer.styl'
export default class CateListContainer extends Component {
  static propTypes = {
    item:PropTypes.object
  };
  render() {
    const {item}=this.props;
    return (
      <div className="cateListContainer">
        <h3 className="title">{item.name}好物</h3>
        <div className="cateList">
          <ul className="goodList">
            {
              item.itemList.map((prod,index)=>(
                <li key={index}>
                  <a href="javascript:;">
                    <div className="cate-header">
                      <div className="img-warp">
                        <img src={prod.listPicUrl}/>
                      </div>
                      <p className="cate-info">{prod.simpleDesc}</p>
                    </div>
                    {
                      prod.promTag?( <div className="support">
                        <p>{prod.promTag}</p>
                      </div>):''
                    }

                    <div className="cate-name">
                      <span>{prod.name}</span>
                    </div>
                    <div className="price">
                      <span>￥{prod.retailPrice}</span>
                    </div>
                  </a>
                </li>
              ))
            }
            {/**/}
            <li className="cate-more" key='8'>
              <a href="javascript:;">
                <p>更多{item.name}好物</p>
                <i className="right-icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}