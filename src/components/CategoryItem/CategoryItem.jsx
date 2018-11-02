import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './categoryItem.styl'

export default class CategoryItem extends Component {
  static propTypes = {
    category: PropTypes.object
  };

  render() {
    const {category}=this.props;
    return (
      <div className="cateListL2">
        {category.type?null:<div className="title" >{category.name}</div>}
        <ul className="list">
          {
            (category.subCateList||[]).map((subCate,index)=>(
              <li className="cateItem" key={index}>
                <a href="javascript:;">
                  <div className="imgWarp">
                    <img src={subCate.wapBannerUrl}/>
                  </div>
                  <div className="name">{subCate.name}</div>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}