<template>
	<div class="vip-agree-wrap">
		<mt-header title="会员协议">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<div class="agree-list">
			<!-- <img :src="xieyiDesc.url" alt="" width="100%"> -->
			<p>此商城是郑州易佳慧实业有限公司旗下的互联网商城，您申请成为本商城的会员时，请认真阅读本须知，当您成功注册本平台会员以后，即表示您已充分阅读、理解并接受本须知的内容，并与本商城达成一致。</p>
			<p>此商城是郑州易佳慧实业有限公司旗下的互联读、理解并接受本须知的内容，并与本商城达成一致。</p>
			<p>此商城是郑州易佳慧实业有限公司旗下的互联员时，请认真阅读本须知，当您成功注册本平台会员以后，即表示您已充分阅读、理解并接受本须知的内容，并与本商城达成一致。</p>
		</div>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "VipAgree",
		data() {
			return {
				xieyiDesc:''
			};
		},
		mounted() {
			// this.xieyi();
		},
		methods: {
			xieyi() {
				request('/api/play_detail').then(res => {
					if (res.code == 200) {
						this.xieyiDesc = res.data
					}
				})
			},
			goBackLastPage() {
				this.$router.back(-1);
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
