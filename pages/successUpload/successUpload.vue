<template>
	<view>
		<view class="unload">
			<text class="iconfont icon-shangchuanyunduan"></text>
		</view>
		<view class="load-box">
			<text class="load">图片上传成功</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style style="scss">
	.unload {
		display:flex;	
		justify-content: center;
		align-items: center;
		margin-top:200upx
	}
    .icon-shangchuanyunduan {
		font-size:200upx;
		color: #00aaff;
	}
	
	.load-box{
		display:flex;
		justify-content: center;
		align-items: center;
		margin-top:100upx
	}
	.load {
		font-size:45upx
	}
</style>
