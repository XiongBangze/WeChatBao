//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items: [],
    hidden: false,
    loading: false,
    // loadmorehidden:true,
    plain: false
  },

  // app:previewImage({
  //   current: '', // 当前显示图片的http链接
  //   urls: [] // 需要预览的图片http链接列表
  // }),

  onItemClick: function (event) {
    console.log('onItemClick')
    console.log(event)
    var targetUrl = "/pages/image/image";
    if (event.currentTarget.dataset != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.img;
    wx.navigateTo({
      url: targetUrl
    });
    console.log(targetUrl)
  },

  loadMore: function( event ) {
    console.log('loadMore')
    console.log(event)
    var that = this
    requestData( that, mCurrentPage + 1 );
  },

  onReachBottom: function () {
    console.log('onLoad')
    var that = this
    that.setData({
      hidden: false,
    });
    requestData(that, mCurrentPage + 1);
  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    // requestData(that, mCurrentPage + 1);
    var itemList = [];
    mUrl.push("../../screenshots/meizhi03.jpg");
    // mUrl.push("http://pj70uhgcp.bkt.clouddn.com/baobao1.jpg");
    mUrl.push("http://pic28.photophoto.cn/20130818/0020033143720852_b.jpg");
    mDesc.push("desv");
    mWho.push("who");
    mTimes.push("times");
    mTitles.push("publish by：" + "@" + "who" + " —— " + "times");
    itemList.push({ url: mUrl[0], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[1], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[2], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[3], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[4], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[5], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[6], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[7], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[8], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[9], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[10], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[11], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[12], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[13], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[14], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });
    itemList.push({ url: mUrl[15], desc: mDesc[0], who: mWho[0], time: mTimes[0], title: mTitles[0] });

    that.setData({
      items: itemList,
      hidden: true,
      // loadmorehidden:false,
    });
  }
  

})

/**
 * 定义几个数组用来存取item中的数据
 */
var mUrl = [];
var mDesc = [];
var mWho = [];
var mTimes = [];
var mTitles = [];

var mCurrentPage = 0;

// 引入utils包下的js文件
var Constant = require('../../utils/constant.js');

/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: Constant.GET_MEIZHI_URL + targetPage,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res == null ||
        res.data == null ||
        res.data.results == null ||
        res.data.results.length <= 0) {

        console.error("god bless you...");
        return;
      }


      for (var i = 0; i < res.data.results.length; i++)
        bindData(res.data.results[i]);

      //将获得的各种数据写入itemList，用于setData
      var itemList = [];
      for (var i = 0; i < mUrl.length; i++)
        itemList.push({ url: mUrl[i], desc: mDesc[i], who: mWho[i], time: mTimes[i], title: mTitles[i] });

      that.setData({
        items: itemList,
        hidden: true,
        // loadmorehidden:false,
      });

      mCurrentPage = targetPage;

      wx.hideToast();
    }
  });
}

/**
 * 绑定接口中返回的数据
 * @param itemData Gank.io返回的content;
 */
function bindData(itemData) {

  var url = itemData.url.replace("//ww", "//ws");
  var desc = itemData.desc;
  var who = itemData.who;
  var times = itemData.publishedAt.split("T")[0];

  mUrl.push(url);
  mDesc.push(desc);
  mWho.push(who);
  mTimes.push(times);
  mTitles.push("publish by：" + "@" + who + " —— " + times);
}