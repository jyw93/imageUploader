// _this: 当前的this，如果不想传递this可将该函数改为箭头函数
// key: 此处的key值可省略，因为项目需要所以给了一个标识而已，未传递默认为''和没写一样。
function ChooseImage(_this, key = '') {
	uni.chooseImage({	
		success: (res) => {
		// 拿到上传的图片列表进行遍历压缩。
			let images = res.tempFilePaths;
			for (let i = 0; i < images.length; i++) {
				compressImage(images[i], _this, function(path, name, _this) {
				// 这里的图片数组我给封装成一个对象也是后台需要。自行调节，后面的预览图片同样。 
					_this.imgList.push({
							"name": key + name, 
							"uri": path
					})
				});
			}
			
		}
	})
}
// 压缩图片 
// src: 压缩转换原始图片的路径
// _this: 当前的this，如果不想传递this可将该函数改为箭头函数
// callback: 回调函数，详情chooseImage方法
function compressImage(src, _this, callback) {
	var dstname = "_doc/IMG-" + (new Date()).valueOf() + ".jpg"; //设置压缩后图片的路径 
	var width, height, quality;
	width = "80%";
	height = "80%";
	quality = 80;
	// 具体情况可查看HTML5+文档 ===> http://www.html5plus.org/doc/zh_cn/zip.html#plus.zip.compressImage
	plus.zip.compressImage({
			src: src,
			dst: dstname,
			overwrite: true,
			quality: quality,
			width: width,
			height: height
		},
		function(event) {
			callback(event.target, dstname, _this);
		},
		function(error) {
			return src;
		});
}
// i： 选择的图片索引
// imgList： 自行封装的图片数组
function ViewImage(i, imgList) {
	let imgurl = []
	imgList.forEach(item => imgurl.push(item.uri))
	uni.previewImage({
		urls: imgurl,
		current: imgList[i].uri
	});
}
// i: 删除图片的索引
// _this: 当前的this，如果不想传递this可将该函数改为箭头函数
function DelImg(i, _this) {
	uni.showModal({
		title: '提示',
		content: '确定要删除照片吗？',
		cancelText: '取消',
		confirmText: '确定',
		success: res => {
			if(res.confirm) {
				_this.imgList.splice(i, 1)
			}
		}
	})
}
