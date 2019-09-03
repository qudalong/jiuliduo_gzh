<template>
	<div class="express-state-wrap">
		<mt-header title="查看物流">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<div v-show="orderInfo!='还未发货'" class="express-flow">
			<div class="express clear">
				<div class="img">
					<img src="../../assets/pw.png" alt />
				</div>
				<mt-cell title="中通快递" label="快递单号：4266875985378874"></mt-cell>
			</div>
			<ul class="time-line">
				<li class="time-line-list clear">
					<p class="end-time">
						8月2日
						<br />12:00:00
					</p>
					<div class="mid-icon">
						<p class="icon">收</p>
						<p class="line"></p>
					</div>
					<div class="express-inf">
						<p class="state">收货地址 河南省郑州市高新区</p>
						<p class="state-inf"></p>
					</div>
				</li>
				<li class="time-line-list clear">
					<p class="end-time">
						8月2日
						<br />12:00:00
					</p>
					<div class="mid-icon">
						<p class="icon">
							<img src="../../assets/hc.png" alt />
						</p>
						<p class="line"></p>
					</div>
					<div class="express-inf">
						<p class="state">已揽货</p>
						<p class="state-inf">您的包裹揽收已有物流公司揽收</p>
					</div>
				</li>
				<li class="time-line-list clear">
					<p class="end-time">
						8月2日
						<br />12:00:00
					</p>
					<div class="mid-icon">
						<p class="icon">发</p>
						<p class="line"></p>
					</div>
					<div class="express-inf">
						<p class="state">已发货</p>
						<p class="state-inf"></p>
					</div>
				</li>
			</ul>
		</div>
	  <div v-show="orderInfo=='还未发货'" class="express-flow" style="text-align: center;
		padding: 50px;">
			{{orderInfo}}
		</div>
	</div>
</template>
<script>
	import request from "../../request/request";
	export default {
		components: {},
		name: "ExpressState",
		data() {
			return {
				orderId: '',
				orderInfo:''
			};
		},
		created() {
			var orderId = this.$route.query.orderId;
			console.log(orderId)
			this.logistics(orderId);
			this.seeWuLiu();
		},
		mounted() {},
		methods: {
			logistics(orderId) {
				let msg = {
					method: 'POST',
					param: {
						num: orderId,
						orderInfo:''
					}
				};
				request("/api/logistics", msg).then(res => {
					if (res.code == 200) {
						this.orderInfo = res.data;
					}
					if (res.code == 300) {
						this.orderInfo = '还未发货'
					}
				});
			},
			seeWuLiu() {
				let msg = {
					method: 'POST',
					param: {
						num: '4862448675892615'
					}
				}
				request("/api/logistics", msg).then(res => {
					// console.log(this.selectedList)
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
