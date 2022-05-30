
<template>
	<view>
		<view class="upload-img">
			<image src="/static/logo.png" class="img" @tap="onGetImgClick"></image>
			<view class="uni-list list-pd">
				<view class="uni-list list-pd">
					<view class="uni-uploader__files">
						<view v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @click="preview(image)"  @longtap="onDeleteClick(index)"></image>
							</view>
						</view>
						<view class="uni-uploader__input-box" v-show="imageList.length > 0">
							<view class="uni-uploader__input" @tap="onGetImgClick"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-button type="primary" v-if="" class="sub">确认提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: [], //存放图片数组
				imageList: [],
			}
 
		},
 
		onLoad() {
 
		},
		methods: {
			// 上传图片
			onGetImgClick() {
				const that = this
				uni.chooseImage({
					count: 3, // 最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						const len = that.imageList.length
						if (len >= 3) {
							uni.showToast({
								title: '图片最多上传3张'
							})
						} else {
							for (let i = 0; i < 3 - len; i++) {
								if (res.tempFilePaths[i]) that.imageList.push(res.tempFilePaths[i])
							}
						}
					}
				})
			},
			// 预览图片
			preview(img) {
				console.log('预览')
				// 新建一个存放预览图片的空数组
				var imgArr = []
				imgArr.push(img)
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
				// 长按删除图片
			onDeleteClick(index) {
				// this.imageList.splice(index, 1)
				uni.showModal({
					title: '删除图片',
					content: '确定删除图片?',
					success: res => {
						if (res.confirm) {
							// 删除图片 将数据置空
							this.imageList.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
		}
	}
</script>


<style lang="scss">
	.sub {
		margin-top: 200upx;
		width:300upx
	}
	.img{
		margin: 50rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.uni-uploader__files {
		margin-left: 50rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
 
	.uni-uploader__img {
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
	}
</style>
