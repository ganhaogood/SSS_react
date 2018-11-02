import React, {Component} from 'react'
import {connect} from 'react-redux'
import BScroll from 'better-scroll'
import Swiper from 'swiper'

import HeaderGuide from '../../components/HeaderGuide/HeaderGuide'
import {getOptimizeData} from '../../redux/actions'
import FooterGuide from '../../components/FooterGuide/FooterGuide'
import MainPosItem from '../../components/MainPosItem/MainPosItem'
import MinorPosItem from '../../components/MinorPosItem/MinorPosItem'
import Surprise from '../../components/Surprise/Surprise'
import './optimize.styl'

class Optimize extends Component {
  state = {
    //懒加载数组的长度
    showSurprise:0,
    //是否滑倒顶部
    isShowGotoTop:false,
    //实际滑动的高度
    scrollY:0,
//  可滑动的高度
    height:0,

    arr:[]
  };

  componentDidMount() {
    this.props.getOptimizeData(()=>{
        this._initOptimize()
    })

  }
  gotoTop=()=>{
    this.scrollBox.scrollTo(0,0,1000)
    this.setState({
      isShowGotoTop:false
    })
  };
  // 自定义更新函数
  update=()=>{
    this.scrollBox.refresh();
    this.setState({
      height:document.querySelector('.contentWarp').offsetHeight
    })
  };
  newArr=()=>{
    const {scrollY,height,showSurprise}=this.state;
    const {optimize_data}=this.props
    if(optimize_data.findMore){
//          获取之前的高度
      if(-scrollY>height-650){
//            每次加载4张
        if(showSurprise+4<optimize_data.findMore.length){
          this.setState({
            showSurprise:showSurprise+4//显示回到顶部图标
          })
        }else{
          this.setState({
            showSurprise:optimize_data.findMore.length//显示回到顶部图标
          })
        }
      }
      console.log(showSurprise,"高度"+height,"滑动"+scrollY);
//          返回截取的数组用slice,不用splice
      this.setState({
        arr:optimize_data.findMore.slice(0,showSurprise)
      })
      // 当数组长度改变时，手动更新，获取新的高度，更新可滑动的距离
      this.update()
    }
  };

  _initOptimize=()=>{
    this.scrollBox=new BScroll('#scrollBox',{
      click:true,
      probeType:1
    });
    this.scrollBox.on('scroll',({x,y})=>{
      //判断是否显示滑动到顶部图标
      this.setState({
        scrollY:y
      });
      if(Math.abs(y)>document.body.clientHeight){
        this.setState({
          isShowGotoTop:true//显示回到顶部图标
        })
      }else {
        this.setState({
          isShowGotoTop:false
        })
      }
      //滑动时手动调用，更新
      this.newArr()
    });
    this.scrollBox.on('scrollEnd',({y}) =>{
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
    this.articleScroll=new BScroll('#article-scroll',{
      click:true,
      scrollX:true
    });
    this.tenFifteen=new BScroll('#tenFifteenBS',{
      click:true,
      scrollX:true
    });

    this.swiper=new Swiper('.swiper-container',{
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop:true
    });

  }
  render() {
    const {optimize_data}=this.props;
    return (
      <div className="shiwuContiner">
        <HeaderGuide/>
        {
          optimize_data.hasMore?(
            <div id="scrollBox">
              <section className="contentWarp">
                <div className="swiper">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {
                        optimize_data.banner.map((bannerList,index)=>(
                          <a className="swiper-slide" key={index}>
                            <img src={bannerList.picUrl}/>
                            <div className="content">
                              <div className="subTitle">{bannerList.subTitle}</div>
                              <div className="title">{bannerList.title}</div>
                              <div className="desc">{bannerList.desc}</div>
                            </div>
                          </a>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="article">
                  <div id="article-scroll">
                    <ul className="article-list">
                      {
                        optimize_data.column.map((column,index)=>(
                          <li key={index}>
                            <div className="img-container" style={{backgroundImage:`url(${column.picUrl})`}}></div>
                            <div className="article-count">
                              <div>{column.articleCount}</div>
                            </div>
                            <div className="title">{column.title}</div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="recommends">
                  <div className="contentContiner">
                    <div className="commonTitle">为你推荐</div>
                    <MainPosItem main={optimize_data.recommendOne}/>
                    <MinorPosItem minor={optimize_data.recommendTwo}/>
                    <MinorPosItem minor={optimize_data.recommendThree}/>
                  </div>
                </div>
                <div className="tenFifteen">
                  <div className="inner">
                    <div className="title">十点一刻</div>
                    <div id="tenFifteenBS">
                      <div className="list">
                        {
                          optimize_data.tenfifteen.map((topic,index)=>(
                            <a className="main" href="javascript:;" key={index}>
                              <div className="line-title">
                                <span>今日话题</span>
                              </div>
                              <div className="title">{topic.title}</div>
                              <div className="desc">{topic.desc}</div>
                              <div className="joinInfo">
                                <div className="joininner">
                                  <div className="avatars">
                                    {
                                      (topic.participantAvatar||[]).map((url,index)=>(
                                        <div className="avatar" key={index}>
                                          <img src={url} alt=""/>
                                        </div>
                                      ))
                                    }
                                  </div>
                                  <div className="joincount">
                                    {topic.participantNum}人参与话题
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))
                        }

                        <a className="more" href="javascript:;">
                          <div className="inner">
                            <div className="text">查看全部话题</div>
                            <i className="right-icon"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="commonTitle">严选臻品</div>
                <MainPosItem main={optimize_data.zhenOne}/>
                <MinorPosItem minor={optimize_data.zhenTwo}/>
                <MinorPosItem minor={optimize_data.zhenThree}/>
                <div className="exploreLook">
                  <div className="commonTitle">严选LOOK</div>
                  <div className="imgWarp">
                    <img src={optimize_data.yxLook.picUrl} alt=""/>
                  </div>
                  <div className="topicInfo">
                    <div className="author">
                      <div className="avatar">
                        <img src={optimize_data.yxLook.avatar} alt=""/>
                      </div>
                      <div className="nickname">{optimize_data.yxLook.nickname}</div>
                    </div>
                    <div className="desc">
                      {optimize_data.yxLook.content}
                    </div>
                  </div>
                </div>
                <div className="moreSurprises">
                  <div className="lineTitle">
                    <div>
                      更多精彩
                    </div>
                  </div>
                  {
                    this.state.arr.map((surprise,index)=>(
                      <Surprise key={index} surprise={surprise}/>
                    ))
                  }
                </div>
              </section>
            </div>
          ):<div></div>
        }
        {this.state.isShowGotoTop?<i className="gotoTop" onClick ={this.gotoTop}></i>:''}
        <FooterGuide path={'/optimize'}/>
      </div>
    )
  }
}

export default connect(
  state => ({optimize_data: state.optimize_data}),
  {getOptimizeData}
)(Optimize)