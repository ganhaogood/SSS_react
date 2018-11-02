import React, {Component} from 'react'
import {connect} from 'react-redux'
import BScroll from 'better-scroll'

import {getCategoryData} from '../../redux/actions'
import CategoryItem from '../../components/CategoryItem/CategoryItem'
import './category.styl'
import FooterGuide from '../../components/FooterGuide/FooterGuide'
class Category extends Component {
  state = {
    currentIndex:0,
  };
  componentDidMount=()=>{
    this.props.getCategoryData()
    this.navScroll=new BScroll('.navScroll',{
      click: true,
      scrollX:false,
    });
    this.catetScroll=new BScroll('.catetScroll',{
      click: true,
      startY: 0
    });
  }
  current(index){
    this.setState({
      currentIndex:index
    })
  }
  render() {
    const {category_data}=this.props
    return (
      <div>
        <div className="category">
          <header className="header">
            <div className="search">
              <div className="content">
                <i className="icon"></i>
                搜索商品, 共13230款好物
              </div>
            </div>
          </header>

          <section className="section">
            <div className="navContiner">
              <div className="navScroll">
                <ul className="navList">
                  {
                    (category_data||[]).map((category,index)=>(
                      <li className={index===this.state.currentIndex?'active':''} key={index} onClick={()=>this.current(index)}>
                        <a className="txt" href="javascript:;">{category.name}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="cateContiner">
              <div className="catetScroll">
                <div className="cates">
                  {
                    (category_data||[]).map((category,index)=>(index===this.state.currentIndex?(
                        <div key={index}>
                          <div className="banner" style={{backgroundImage:`url(${category.bannerUrl})`}}></div>
                          <div className="cateList">
                            <CategoryItem category={category}/>
                          </div>
                        </div>):null
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterGuide path={'/category'}/>
      </div>
    )
  }
}

export default connect(
  state => ({category_data: state.category_data}),
  {getCategoryData}
)(Category)