import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import './mock/mock'
import './index.styl'

import store from './redux/store'
import Home from './containers/Home/Home';
import Optimize from './containers/Optimize/Optimize';
import Category from './containers/Category/Category';
import ShopChart from './containers/ShopChart/ShopChart';
import Personal from './containers/Personal/Personal';
import Interlayer from './components/Interlayer/Interlayer'
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        {/*<Route path='/interlayer' component={Interlayer}/>*/}
        <Route path='/home' component={Home}/>
        <Route path='/optimize' component={Optimize}/>
        <Route path='/category' component={Category}/>
        <Route path='/shopchart' component={ShopChart}/>
        <Route path='/personal' component={Personal}/>
        <Route component={Interlayer}/>
        {/*<Redirect to="/interlayer"/>*/}
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));


