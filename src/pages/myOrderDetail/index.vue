<template>
	<div class="my-order-detail-wrap">
		<mt-header title="订单详情">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<div v-show="orderInfo!='还未发货'" class="order-state">
			<h4>卖家已发货</h4>
			<p>还剩下12天确认</p>
		</div>
		<div v-show="orderInfo=='还未发货'" class="order-state">
			<h4>{{orderInfo}}</h4>
		</div>
		<div v-show="orderInfo!='还未发货'" class="express-state clear">
			<div class="img">
				<img src="../../assets/hc.png" alt />
			</div>
			<mt-cell title="武汉市，您的包裹已由物流公司揽收" :label="orderDesc.created_at" is-link to="/expressstate"></mt-cell>
		</div>
		<div class="address-wrap">
			<div class="address clear">
				<div class="img">
					<img src="../../assets/pw.png" alt />
				</div>
				<mt-cell :title="userName+'  '+userPhone" :label="orderDesc.shop_address"></mt-cell>
			</div>
			<p v-show="orderInfo!='还未发货'" class="express-time clear">
				<i>配送时间</i>
				<b>预计8月8号送达</b>
			</p>
		</div>
		<div class="goods-inf clear">
			<img :src="shopInfoImg" alt />
			<div class="order-inf clear">
				<h4>{{shopInfo.shop_sketch}}</h4>
				<p class="price clear">
					<i>￥{{orderDesc.shop_price}}</i>
					<b>x1</b>
				</p>
				<p class="all-price">
					共1件商品 合计：
					<i>￥{{orderDesc.shop_price}}</i>
				</p>
				<div class="order-oper clear">
					<p>已发货</p>
					<p>
						<router-link :to="{path:'/expressstate',query: {orderId: orderDesc.order_sn}}">查看物流</router-link>
					</p>
					<p>
						<router-link :to="{path:'/goodsdetail',query: {goodsId: orderDesc.shop_id}}">继续下单</router-link>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import request from "../../request/request";
	export default {
		components: {},
		name: "MyOrderDetail",
		data() {
			return {
				orderDesc: '',
				shopInfo: '',
				shopInfoImg: '',
				userName: '张三',
				userPhone: '13567653487',
				orderInfo: ''
			};
		},
		created() {
			var order_sn = this.$route.query.orderId;
			console.log('order_sn=' + order_sn);
			this.order_info(order_sn);
			this.logistics(order_sn);
		},
		methods: {
			logistics(orderId) {
				let msg = {
					method: 'POST',
					param: {
						num: orderId
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
			order_info(orderId) {
				let msg = {
					param: {
						order_sn: orderId
					}
				};
				request("/api/order_info", msg).then(res => {
					if (res.code == 200) {
						this.orderDesc = res.data;
						this.shopInfo = res.data.get_shop_image;
						this.shopInfoImg = res.data.get_shop_image.shop_img[0];
					}
				});
			},
			goBackLastPage() {
				this.$router.back(-1);
			}
		}
	}
</script>
<style scoped>
	@import "./index.css";

	>>>.mint-cell-wrapper {
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	}
</style>
