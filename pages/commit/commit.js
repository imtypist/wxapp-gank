var inputContent = {
	debug:true
};
var lock = true;

Page({
	data:{
		toast1Hidden:true,
		loading:false,
		disabled:false
	},
	toast1Change: function(){
		this.setData({
			toast1Hidden:true
		});
		wx.navigateBack();
	},
	submitGank: function(){
		var that = this;
		if(lock){
			that.setData({
				loading:true,
				disabled:true
			});
			lock = false;
			wx.request({
				url:"https://gank.io/api/add2gank",
				data:inputContent,
				method:"POST",
				header:{
					"Content-Type":"application/json"
				},
				success:function(req){
					console.log(req.data);
					lock = true;
					that.setData({
						loading:false,
						disabled:false,
						toast1Hidden:false
					});
				}
			});
		}
	},
	bindChange:function(e){
		inputContent[e.currentTarget.id] = e.detail.value;
	}
});