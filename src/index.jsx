import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/store';

import Login from 'page/Login/index';
import Account from 'page/AccountManage/index';
import App from 'page/App/index';
import Teacher from 'page/Teacher/index';
import StudentInfo from 'page/Teacher/studentInfo';
import Detail from 'page/teacher/Detail';
import Manager from 'page/Manager/index';
import Student from 'page/Student/index';
import Judge from 'page/Judge/index';
import IsApprove from 'page/Judge/isApprove';
import Apply from 'page/Student/Apply';
import Score from 'page/Student/score.jsx';
// import ViewPro from 'page/Manager/viewPro.jsx';
// import Detail from 'page/Manager/detail.jsx';

const middlewareArr = [
  applyMiddleware(thunk)
  // ,
  // window['__REDUX_DEVTOOLS_EXTENSION__'] &&
  // window['__REDUX_DEVTOOLS_EXTENSION__']()
]

const store = createStore(reducer, compose(...middlewareArr));

const routers = (
  <Router>
    <App>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/account-management' component={Account} />
        <Route exact path='/student' component={Student} />
        <Route exact path='/student/apply' component={Apply} />
        <Route exact path='/student/scoreQuery' component={Score} />
        {/* <Route path='/student/edit-project/:id' component={Apply} /> */}
        <Route exact path='/teacher' component={Teacher} />
        <Route exact path='/teacher/detail/:key' component={Detail} />
        <Route exact path='/teacher/student-info' component={StudentInfo} />
        <Route exact path='/manager' component={Manager} />
        {/* <Route exact path='/manager/view-project' component={ViewPro} /> */}
        {/* <Route exact path='/manager/view-project/:id' component={Detail} /> */}
        <Route exact path='/judges' component={Judge} />
        <Route exact path='/judges/isApprove' component={IsApprove} />
        <Route exact path='/judges/detail/:key' component={Detail} />
      </Switch>
    </App>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    {routers}
  </Provider>,
  document.getElementById('root')
);