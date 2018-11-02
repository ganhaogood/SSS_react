import React,{Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import BScroll from 'better-scroll'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'

import './home.styl'
import {getHomeData} from '../../redux/actions'
import Items from '../../components/Items/Items'
import CateListContainer from '../../components/CateListContainer/CateListContainer'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

class Home extends Component {
  state = {
    currentIndex:0,
    time:Date.now(),
    isShowGotoTop:false,//是否显示到顶部按钮
    isShowNews:true,//是否显示遮罩层
  };
  componentDidMount(){
    this.props.getHomeData();
    this._initScroll();
    this.intervalId=setInterval(()=>{
      // 模拟倒计时
      const time=this.state.time-1000
      this.setState({
        time
      })
    },1000)
  };
  isShowNews=()=>{
    this.setState({isShowNews : false})
  }
  componentWillUnmount () {// 清除定时器
    clearInterval(this.intervalId)
  };
  _initScroll(){
    this.navBar=new BScroll('.nav',{
      click: true,
      scrollX:true,
    });
    new Swiper('.swiper-container',{
      // initialSlide :0,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,
      // 如果需要分页器
      autoplay:true,
      pagination: {
        el: '.swiper-pagination',
      }
    });
    this.homeScroll=new BScroll('.homeContiner',{
      click: true,
      scrollX:false,
      probeType:1
    });
    //滑动过程中是否显示到顶部按钮
    this.homeScroll.on('scroll',({x,y})=>{
      if(Math.abs(y)>document.body.clientHeight){
        this.setState({
          isShowGotoTop:true
        })
      }else {
        this.setState({
          isShowGotoTop:false
        })
      }
    });
    // 根据滑动的最终位置判断是否显示到顶部按钮
    this.homeScroll.on('scrollEnd',({y}) =>{
      if(Math.abs(y)>document.body.clientHeight){
        this.setState({
          isShowGotoTop:true
        })
      }else {
        this.setState({
          isShowGotoTop:false
        })
      }
    });
    this.topicScroll = new BScroll('.topicScrollBox',{
      click: true,
      scrollX:true,
    });
  }
  selectItem(index){
    this.setState({
      currentIndex:index
    })
    // 滑动到某个元素
    this.navBar.scrollToElement(this.ul.children[index],1000);
  };
  gotoTop=()=>{
    this.homeScroll.scrollTo(0,0,1000)
    this.setState({
      isShowGotoTop:false
    })
  }
  render(){
    const {home_data}=this.props;
    return(
      <div>
        <div className="wrap">
          <header className="headerTop">
            <div className="logo-search">
              <span className="logo"></span>
              <div className="search">
                <i className="search-icon"></i>
                <span>搜索商品，共16706款好物</span>
              </div>
            </div>
            {/*<!--头部导航-->*/}
            <div className="nav">
              <ul className="navList" ref={ul => this.ul = ul}>
                <li className={this.state.currentIndex===0? "active": ''} onClick={()=>this.selectItem(0)}>推荐</li>
                {
                  (home_data.cateList||[]).map((item,index)=>(
                    <li className={this.state.currentIndex===index+1? "active": ''} key={index} onClick={()=>this.selectItem(index+1)}>{item.name}</li>)
                  )
                }
              </ul>
            </div>
          </header>
          <div className="homeContiner">

            {/*主体*/}
            <section className="content">
              <div className="swiper">
                {/*<!--轮播-->*/}
                <div className="swiper-container">
                  <div className="swiper-wrapper" >
                    {
                      (home_data.focusList||[]).map((slideItem,index)=>(
                        <div className="swiper-slide" key={index}>
                          <img src={slideItem.picUrl}/>
                        </div>
                      ))
                    }
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
                {/*<!--品牌-->*/}
                <div className="supports">
                  <ul>
                    <li>
                      {
                        (home_data.policyDescList||[]).map((Desc,index)=>(
                          <a href="javascript:;" key={index} >
                            <i className="iconImg"></i>
                            <span>{Desc.desc}</span>
                          </a>
                        ))
                      }
                    </li>
                  </ul>
                </div>
              </div>
              {/*<!--制造商直供-->*/}
              <div className="brand">
                <header className="brand-header">
                  <a>
                    <span>品牌制造商直供</span>
                    <i className="right-icon"></i>
                  </a>
                </header>
                <div className="brand-goods">
                  <ul>
                    {
                      (home_data.tagList||[]).slice(0,4).map((tag,index)=>(
                        <li className="goods" key={index}>
                          <a>
                            <div className="content-goods">
                              <h4>{tag.name}</h4>
                              <div className="price">
                                <span className="price1">{tag.floorPrice}</span>
                                <span className="price2">元起</span>
                              </div>
                              <i className="shangxin-icon"></i>
                            </div>
                            <img src={tag.picUrl}/>
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              {/*组件*/}
              {
                home_data.newItemList?(
                  <div>
                    <Items classNames='newItemList' ItemList ={home_data.newItemList} />
                    <Items classNames='popularItemList' ItemList ={home_data.popularItemList}/>
                  </div>
                ):''

              }
              {/*<!--限时购-->*/}

              <div className="limitTime">
                <a>
                  <div className="limitTime-warp">
                    <div className="left-item">
                      <div className="title">严选限时购</div>
                      <div className="countdown">
                        <span className="hours time">{moment(this.state.time).format("HH")}</span>
                        <span className="colon" >:</span>
                        <span className="mins time" >{moment(this.state.time).format('mm')}</span>
                        <span className="colon" >:</span>
                        <span className="secs time" >{moment(this.state.time).format('ss')}</span>
                      </div>
                      <div className="next-title">
                        <span>下一场</span>
                        {
                          home_data.flashSaleIndexVO?(<span >{moment(home_data.flashSaleIndexVO.nextStartTime).format("HH:mm")}</span>):null
                        }
                        <span>开始</span>
                      </div>
                    </div>
                    <div className="right-item">
                      <div className="imgWarp">
                        {home_data.flashSaleIndexVO?<img src={home_data.flashSaleIndexVO.primaryPicUrl} alt=""/>:''}
                      </div>
                      <div className="price">
                        <div className="nowPrice">
                          <span className="rmb">￥</span>
                          {home_data.flashSaleIndexVO?<span>{home_data.flashSaleIndexVO.activityPrice}</span> :''}}
                        </div>
                        <div className="originPrice">
                          <span className="rmb">￥</span>
                          {home_data.flashSaleIndexVO?<span>{home_data.flashSaleIndexVO.originPrice}</span>:''}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              {/*<!--福利社-->*/}
              <div className="fuli"></div>
              {/*<!--专题-->*/}
              <div className="topicList">
                <div className="topic-title">
                  <a>
                    <span>专题精选</span>
                  </a>
                </div>
                <div className="topic-items">
                  <div className="topicScrollBox">
                    <ul >
                      {
                        (home_data.topicList||[]).map((topic,index)=>(
                          <li key={index}>
                            <a href="javascript:;">
                              <img src={topic.itemPicUrl}/>
                            </a>
                            <div className="item-price">
                              <h4>{topic.title}</h4>
                              <span>
                          {topic.priceInfo}元起
                        </span>
                            </div>
                            <div className="item-info">{topic.subtitle}</div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              {/*<!--居家好物等-->*/}
              {
                (home_data.cateList||[]).map((item,index)=><CateListContainer item={item} key={index}/>)
              }

              {/*<!--底部-->*/}
              <div className="downLoad-copyright">
                <div>
                  <div className="downLoad">
                    <a href="javascript:;">下载APP</a>
                    <a href="javascript:;">电脑版</a>
                  </div>
                  <p className="copyright">
                    <span>网易公司版权所有 © 1997-2018</span>
                    <span>食品经营许可证：JY13301080111719</span>
                  </p>
                </div>
              </div>
            </section>
            {this.state.isShowGotoTop?<i className="gotoTop" onClick ={this.gotoTop}></i>:''}
            {
              this.state.isShowNews?(
                <div className="newsWarp">
                  <div className="mask"></div>
                  <i className="close-button" onClick ={this.isShowNews}></i>
                  <div className="modal">
                    <a className="linkBtn" href="javascript:void(0);" data-reactid=".1.2.0.0">立即去领取</a>
                  </div>
                </div>):''
            }

          </div>
        </div>
        <FooterGuide path={'/home'}/>
      </div>
    )
  }
}
export default connect(
  state=>({home_data:state.home_data}),
  {getHomeData}
)(Home)
