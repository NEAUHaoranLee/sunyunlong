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
  userType: '',
  userName: '',
  userAccount: '',
  loading: false,
  applyType: [],
  //管理员
  mRelease: {},
  //学生
  sApply: [],
  sScore: [],
  editData: {},
  //评审
  judgeData: [],
  jIsApproveList: [],
  //老师
  tApplyList: [],
  tDetail: {},
  tStudentInf: [],
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
        date
      }
    }) => {
      if (code === 200) {
        dispatch(
          actions.updateProps({
            userType: date.userType,
            userName: date.userName,
            userAccount: date.account,
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
        date
      }
    }) => {
      if (code === 200) {
        dispatch(actions.loadingControl(false))

        dispatch(
          actions.updateProps({
            userType: date.userType,
            userName: date.userName,
            userAccount: params.account
          })
        )
      } else if (code === 205) {
        message.error(date)
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
  getManagerRelease: (params) => (dispatch) => {
    instance.post('/admin/release', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          mRelease: p.managerFormatter(res.data.date),
        })
      );
    })
  },
  managerSubmission: (params) => (dispatch) => {
    dispatch(actions.loadingControl(true))

    return instance.post('/admin/submission', params).then((res) => {
      dispatch(actions.loadingControl(false))
      return res;
    });
  },
  managerRemind: (params) => (dispatch) => {
    dispatch(
      actions.updateProps({
        loading: true,
      })
    );

    return instance.post('/admin/remind', params).then((res) => {
      dispatch(
        actions.updateProps({
          loading: false,
        })
      );

      return res;
    });
  },
  //评委
  getJudgeData: (params) => (dispatch) => {
    instance.post('/judges/approvalFind', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          judgeData: res.data.date,
        })
      );
    })
  },
  judgeApprove: (params) => (dispatch) => {
    return instance.post('/judges/approval', params).then((res) => {
      if (res.data.code !== 200) return;
    })
  },
  judgeNotApprove: (params) => (dispatch) => {
    instance.post('/judges/notApproval', params).then((res) => {
      if (res.data.code !== 200) return;
    })
  },
  judgeIsApproveList: (params) => (dispatch) => {
    instance.post('/judges/myApproval', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          jIsApproveList: res.data.date,
        })
      );
    })
  },
  //老师
  teacherApplyList: (params) => (dispatch) => {
    instance.post('/teacher/applyManager', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          tApplyList: res.data.date,
        })
      );
    })
  },
  teacherApplyDetail: (params) => (dispatch) => {
    instance.post('/teacher/details', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          tDetail: res.data.date,
        })
      );
    })
  },
  teacherStdInfo: (params) => (dispatch) => {
    instance.post('/teacher/findInf', params).then((res) => {
      if (res.data.code !== 200) return;

      dispatch(
        actions.updateProps({
          tStudentInf: res.data.date,
        })
      );
    })
  },
  teacherApprove: (params) => (dispatch) => {
    return instance.post('/teacher/approval', params).then((res) => {
      if (res.data.code === 200) return true;
    })
  },
  teacherNotApprove: (params) => (dispatch) => {
    return instance.post('/teacher/notApproval', params).then((res) => {
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