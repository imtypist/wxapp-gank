Page({
	data:{
		img:{},
		results:[],
		video:null,
		hidden:false,
		display:"none"
	},
	onLoad: function(options){
		var time = options.time.replace(/-/g,"/");
		var that = this;
		wx.request({
			url:"http://gank.io/api/day/" + time,
			header:{
				"Content-Type":"application/json"
			},
			success: function(req){
				var data = req.data;
				var results = [];
				var img = {};
				var video;
				for(var i = 0;i < data.category.length;i++){
					// 福利
					if(data.category[i] == "\u798f\u5229"){
						img.url = data.results[data.category[i]][0].url.replace("//ww","//ws");
						img.time = data.results[data.category[i]][0].publishedAt.split('T')[0];
					}else if(data.category[i] == "\u4f11\u606f\u89c6\u9891"){ //视频
						video = data.results[data.category[i]][0].url;
					}else{
						var temp = {
							'category':data.category[i]
						};
						temp.detail = data.results[temp.category];
						results.push(temp);
					}
				}
				that.setData({
					img:img,
					results:results,
					video:video,
					hidden:true,
					display:"block"
				});
				that.update();
			}
		})
	}
});