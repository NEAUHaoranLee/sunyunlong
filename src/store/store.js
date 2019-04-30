import Cookies from 'browser-cookies';
import {
  message
} from 'antd';
import axios from 'axios';
import md5 from 'js-md5';
import * as p from 'src/pure';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
});
axios.defaults.withCredentials = true; //让ajax携带cookie

const initState = {
  userType: 'student',
  userName: '',
  userAccount: 'A19150292',
  loading: false,
  applyType: [],
  //管理员
  mProcess: [],
  // mProcessTable: [], //首页
  processManageData: [], //流程管理
  processDetailsData: [], //详情
  //学生
  sApply: [],
  sScore: [],
  editData: {},
  //评审
  judgeData: {},
  //老师
  tApproveList: [],
  tProjectList: [],
}

const TYPE = {
  UPDATE_PROPS: Symbol('update')
}

export const actions = {
  updateProps: (payload) => (dispatch) => {
    dispatch({
      type: TYPE.UPDATE_PROPS,
      payload,
    })
  },
  //loading control
  loadingControl: (status) => (dispatch) => {
    dispatch(
      actions.updateProps({
        loading: status
      })
    )
  },
  //根据cookie查询登录状态
  getUserInfo: () => (dispatch) => {
    return instance.get('/checkLogin').then(({
      data: {
        code,
        data
      }
    }) => {
      if (code === 200) {
        dispatch(
          actions.updateProps({
            userType: data.userType,
            userName: data.userName,
            userAccount: data.account,
          })
        )
        return false;
      } else return true;
    })
  },
  //用户登录
  userSignIn: (params) => (dispatch) => {
    dispatch(actions.loadingControl(true))

    // const params = { account, password: md5(password) }
    instance.post('/login', params).then(({
      data: {
        code,
        data
      }
    }) => {
      if (code === 200) {
        dispatch(
          actions.updateProps({
            userType: data.userType,
            userName: data.userName,
            userAccount: params.account
          })
        )
      } else if (code === 205) {
        message.error(data)
      }
    })
  },
  userSignOut: () => (dispatch) => {
    instance.get('/exit').then(() => {
      // Cookies.erase('login_ticket');

      dispatch(
        actions.updateProps({
          userName: '',
          userType: 'login',
        })
      )
    })
  },
  changePassword: (params) => (dispatch) => {
    return instance.post('/changePassword', params)
  },
  //学生
  getApplyType: () => (dispatch) => {
    instance.get('/student/applyType').then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          applyType: res.data.date,
        })
      );
    })
  },
  getStudentScore: (params) => (dispatch) => {
    instance.post('/student/scoreQuery', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          sScore: res.data.date,
        })
      );
    })
  },
  applyProject: (params) => (dispatch) => {
    return instance.post('/student/onlineApply', params).then((res) => {
      return res.data;
    })
  },
  getStudentApply: (params) => (dispatch) => {
    instance.post('/student/myApply', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          sApply: res.data.date,
        })
      );
    })
  },
  //管理员
  getManagerProcess: (params) => (dispatch) => {
    instance.post('/manager/currentProcess', params).then((res) => {
      if (res.data.code !== 200 || res.data.data === 'null') return;

      dispatch(
        actions.updateProps({
          mProcess: res.data.data.unifiedTable,
          mProcessTable: p.managerProDataFormatter(res.data.data),
        })
      );
    })
  },
  processManage: (params) => (dispatch) => {
    instance.post('/manager/overview', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          processManageData: res.data.data
        })
      );
    })
  },
  processDetails: (params) => (dispatch) => {
    instance.post('/manager/details', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          processDetailsData: res.data.data
        })
      );
    })
  },
  newProcess: (params) => (dispatch) => {
    return instance.post('/manager/newAndEditProcess', params);
  },
  stopCollect: (params) => (dispatch) => {
    return instance.post('/manager/stop', params);
  },
  submitFinalResult: (params) => (dispatch) => {
    return instance.post('/manager/apply', params);
  },
  //评委
  getJudgeData: (params) => (dispatch) => {
    instance.post('/judge/view', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          judgeData: res.data.data,
        })
      );
    })
  },
  submitJudges: (params) => (dispatch) => {
    return instance.post('/judge/apply', params).then((res) => {
      if (res.data.code !== 200) return;
    })
  },
  saveJudges: (params) => (dispatch) => {
    instance.post('/judge/save', params).then((res) => {
      if (res.data.code !== 200) return;
    })
  },
  //老师
  teacherApproveList: (params) => (dispatch) => {
    instance.post('/teacher/pApproval', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          tApproveList: res.data.data === 'null' ? [] : res.data.data,
        })
      );
    })
  },
  teacherProjectList: (params) => (dispatch) => {
    instance.post('/teacher/myProject', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          tProjectList: res.data.data === 'null' ? [] : res.data.data,
        })
      );
    })
  },
  teacherApprove: (params) => (dispatch) => {
    return instance.post('/teacher/approve', params).then((res) => {
      if (res.data.code === 200) return true;
    })
  },
  // createUsers: (params) => (dispatch) => {
  //   instance.post('/auth/createAuth', params)
  // }
}

export default (state = initState, {
  type,
  payload
}) => {
  if (type === TYPE.UPDATE_PROPS) {
    return {
      ...state,
      ...payload
    }
  }
  return state;
}