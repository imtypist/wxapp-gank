var util = require('../../utils/util.js');
var pageNo = 1;
var totalData = [];

Page({
  data: {
    gank: [],
    hidden:false,
    display:"none"
  },
  onLoad: function () {
    var that = this;
    getList(that,pageNo);
  },
  clickBlock: function(e){
    wx.navigateTo({url:"/pages/single/single?time="+ e.currentTarget.dataset.blockTime});
  }
});

function getList(that,pageNo){
  wx.request({
      url:"http://gank.io/api/history/content/10/" + pageNo,
      header:{
        "Content-Type":"application/json"
      },
      success:function(req){
        var data = req.data;
        pageNo ++;
        if(data.error == false){
          var re = new RegExp("http://w{2}[^\"]*");
          for(var i = 0;i < data.results.length;i++){
            // 截取时间格式
            data.results[i].publishedAt = data.results[i].publishedAt.split('T')[0];
            // 解析url
            data.results[i].url = data.results[i].content.match(re)[0].replace("//ww","//ws");
            // 删除content
            delete data.results[i].content;
            // 全局变量储存数据
            totalData.push(data.results[i]);
          }
          that.setData({
            gank:totalData,
            hidden:true,
            display:"block"
          });
          that.update();
        }
      }
    });
  console.log(totalData);
}