<template>
	<view class="content">
		<view class="main">
			<view class="addPic">
					<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="3"
							:previewFullImage="true"
						></u-upload>
			</view>
			<view class="intro">
				<u--form
				>
					<u-form-item
						label="作品"
						borderBottom
						class="works"
					>
					<u--input
					border="none"
					>
					</u--input>
					</u-form-item>
					<u-form-item 
						label="姓名"
						borderBottom
						class="works"
					>
					<u--input
					border="none"
					>
					</u--input>
					</u-form-item>
				</u--form>
				<view class="table3">
					<u--textarea class="destroy" placeholder="作品描述,不超过140个字" count >
					</u--textarea>
				</view>
			</view>
			<u-button @click="submit" class="sub">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
			}
		},
		methods: {
			// 删除图片
						deletePic(event) {
							this[`fileList${event.name}`].splice(event.index, 1)
						},
						// 新增图片
						async afterRead(event) {
							// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
							let lists = [].concat(event.file)
							let fileListLen = this[`fileList${event.name}`].length
							lists.map((item) => {
								this[`fileList${event.name}`].push({
									...item,
									status: 'uploading',
									message: '上传中'
								})
							})
							for (let i = 0; i < lists.length; i++) {
								const result = await this.uploadFilePromise(lists[i].url)
								let item = this[`fileList${event.name}`][fileListLen]
								this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
									status: 'success',
									message: '',
									url: result
								}))
								fileListLen++
							}
						},
						uploadFilePromise(url) {
							return new Promise((resolve, reject) => {
								let a = uni.uploadFile({
									url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
									filePath: url,
									name: 'file',
									formData: {
										user: 'test'
									},
									success: (res) => {
										setTimeout(() => {
											resolve(res.data.data)
										}, 1000)
									}
								});
							})
			},
			submit() {
				uni.setStorage({
					key: 'storage_key',
					data: 'hello',
					success: function () {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.main {
		background-color: #fff;
		margin: 24upx;
		border-radius: 4%;
		box-shadow: 0px 0px 10px #e3e3e3;
	}
	.addPic {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.u-upload {
			margin-top: 24upx;
			margin-left: 24upx;
			margin-left: 24upx;
			width:100upx;
		}
	}
	
	.destroy {
		margin:54upx 20upx;
		background-color: #f4f5f7;
	}
	
	.sub {
		border-radius:8upx;
		background-color: #00aaff;
		width:300upx;
		margin-top: 200upx;
		margin-bottom: 24upx;
		font-size:32upx;
		color:#fff;
	}
	
	.works {
		margin:24upx
	}
	
	
</style>
