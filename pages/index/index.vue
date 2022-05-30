<template>
	<view class="content">
		<view class="banner">
			<swiper autoplay="true" circular="true" :interval="3000" :duration="5000" :indicator-dots="true"
			        indicator-color="rgba(0, 0, 0, .3)"
					indicator-active-color="#000"
			>
				<swiper-item v-for="(item,index) in advList" :key="index">
						<image :src="item.src"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="context-rule">
			<view class="rule">
				<text class="tim">
					书签设计大赛规则:<br/>主题为“夏日书香”，材质不限，要求为原创作品，有艺术感，有创意，上传设计照片，比赛结果由公众投票决定
				</text>
			</view>
			</text><br/>
			<text class="tim">
				作品上传时间：5.12-5.19
			</text><br/>
			<text class="tim">
				作品投票时间：5.19-5.26
			</text><br/>
			<text class="tim">
				奖品：稿费50元
			</text>
		</view>
		<button class="apply" @click="applyNow">立即参加</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				advList: [
					{
						src:'../../static/images/adv1.jpg'
					},
					{
						src:'../../static/images/adv2.jpg'
					},
					{
						src:'../../static/images/adv5.jpg'
					}
				]	
			}
		},
		onLoad() {

		},
		methods: {
			applyNow() {
				uni.navigateTo({
					url:'../imgUploader/imgUploader'
				})
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		width:100%;
		height:300upx;
		swiper-item {
					border-radius:10upx;
					height:300upx;
	    }
		image {
					width:100%;
					height:300upx;
		}
	}
	
	.context-rule {
		margin: 60upx 60upx;
		.tim {
			font-size: 30upx;
			font-weight: bold;
			font-style:italic;
			overflow:auto
		}
	}
	
	button {
		margin:60upx;
		width:240upx;
		margin:150upx auto;
		background-color:#0081ff;
		color:#fff;
		border-radius: 80upx;
		font-size:32upx;
		border:1px solid #0081ff;
		box-shadow: 4px 5px 8px #bbc3cb;
	}
	
	
	
	
</style>
