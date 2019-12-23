const API_ROOT = 'http://192.168.10.150:8099/v1/api';
var api = {
  Nodes: {
    GetNodeList: API_ROOT + '/Nodes/GetNodesList',
    GetNodeDetail: API_ROOT + '/Nodes/GetNodeDetail',
    GetRegionTree: API_ROOT + '/Nodes/GetRegionTree'
  },
  Washer: {
    GetConsumeLogList: API_ROOT + '/Washer/GetConsumeLogList',
    GetConsumeEvaluationList: API_ROOT + '/Washer/GetConsumeEvaluationList',
  },
  Recharge: {
    GetRechargeLogList: API_ROOT + '/Recharge/GetRechargeLogList',
    Pay: API_ROOT + '/Recharge/Pay',
    GetRechargeViewInfo: API_ROOT + '/Recharge/GetRechargeViewInfo'
  },
  SystemServe: {
    PostFeedback: API_ROOT + '/SystemServe/PostFeedback',
    GetNotices: API_ROOT + '/SystemServe/GetNotices',
    GetNoticeDetail: API_ROOT + '/SystemServe/GetNoticeDetail',
    SendSMSCode: API_ROOT + '/SystemServe/SendSMSCode',
    InsertNoticesUser: API_ROOT + '/SystemServe/InsertNoticesUser'
  },
  Picture: {
    UploadImg: API_ROOT + '/Picture/UploadImg'
  },
  Users: {
    GetWxacodeUnlimitQRCode: API_ROOT + '/Users/GetWxacodeUnlimitQRCode',
    Login: API_ROOT + '/Users/Login',
    BindingPhone: API_ROOT + '/Users/BindingPhone',
    GetUsersBaseInfo: API_ROOT + '/Users/GetUsersBaseInfo',
    GetUsersInfo: API_ROOT + '/Users/GetUsersInfo',
    UpdatePassword: API_ROOT + '/Users/UpdatePassword'
  },
  Recommend: {
    GetRecommendRecordList: API_ROOT + '/Recommend/GetRecommendRecordList',
  },
  RecordDetail: {
    GetTicketSendList: API_ROOT + '/RecordDetail/GetTicketSendList',
    GetCouponVoucher: API_ROOT + '/RecordDetail/GetCouponVoucher'
  }
}

module.exports = api;