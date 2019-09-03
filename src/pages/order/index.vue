<template>
	<div class="order-wrap">
		<mt-header fixed title="提交订单">
			<div slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<p style="height:40px"></p>
		<mt-cell title="添加收货地址" to="/myAddress" class="mint-cell-reset" is-link></mt-cell>
		<div v-show='name' class="address clear">
			<div class="img">
				<img src="../../assets/p.png" alt />
			</div>
			<mt-cell :title="name" :label="address" is-link :to="{path:'/myaddress',query: {ind:index}}"></mt-cell>
		</div>
		<div class="goods-inf clear">
			<img :src="img" alt />
			<div class="order-inf">
				<h4>{{shop_sketch}}</h4>
				<p class="price clear">
					<i>￥{{fracture_price}}</i>
					<b>x{{goodsNum}}</b>
				</p>
				<p class="all-price">
					共{{goodsNum}}件商品 合计：
					<i>￥{{goodsTotalMoney}}</i>
				</p>
			</div>
		</div>
		<mt-cell v-show='yhjLen' @click.native="clickPickCoupon" title="可用优惠券" :value="yhjLen" is-link class="mint-cell-reset"></mt-cell>
		<div class="submit-btn">
			<mt-button @click='tijiaoOrder' type="danger" size="large">提交订单</mt-button>
		</div>
		<div v-if="couponSign">
			<coupon v-on:clickOkBtn="clickOkBtn"></coupon>
		</div>
	</div>
</template>
<script>
	import request from "../../request/request";
	import Coupon from "../../components/Coupon";
	import {
		Indicator
	} from 'mint-ui';
	import {
		Toast
	} from 'mint-ui';
	export default {
		components: {
			Coupon
		},
		name: "Order",
		data() {
			return {
				couponSign: false,
				goodsInfo: {},
				goodsNum: 0,
				goodsTotalMoney: 0,
				fracture_price: 0,
				shop_sketch: '',
				img: '',
				goodsId: 0,
				order_sn: '',
				address: '',
				phone: '',
				name: '',
				index: 0,
				yhjLen: 0,
				yhjArr: [],
				youhuiId: 0
			};
		},
		mounted() {
			
			// 获取收货地址
			this.name = localStorage.getItem('name');
			this.phone = localStorage.getItem('phone');
			this.address = localStorage.getItem('address');
			this.index = localStorage.getItem('index');
			console.log('name=' + this.name)
			// 获取商品信息
			var goodsInfo = JSON.parse(sessionStorage.getItem('goodsInfo'));
			console.log(goodsInfo)
			this.yhjLen = goodsInfo.coupons_data.length;
			this.yhjArr = goodsInfo.coupons_data;
			this.goodsId = goodsInfo.shop_data.id;
			this.fracture_price = goodsInfo.shop_data.fracture_price;
			this.img = goodsInfo.shop_data.shop_img[0];
			this.shop_sketch = goodsInfo.shop_data.shop_sketch;
			this.goodsNum = sessionStorage.getItem('goodsNum');;
			this.goodsTotalMoney = sessionStorage.getItem('goodsTotalMoney');
		},
		methods: {
			tijiaoOrder() {
				if (!this.address) {
					this.$toast('请选择收货地址');
					return;
				}
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle',
				});
				this.createOrder();
			},
			createOrder() {
				var is_vouchers = '0';
				if (this.youhuiId) {
					is_vouchers = this.youhuiId;
				}
				let msg = {
					method: 'POST',
					param: {
						shop_id: this.goodsId,
						shop_price: this.fracture_price,
						is_vouchers: is_vouchers,
						shop_address: this.address
					}
				};
				request("/api/new_order", msg).then(res => {
					if (res.code == 200) {
						this.order_sn = res.data.order_sn;
						// 提交订单
						let msg = {
							method: 'POST',
							param: {
								order_sn: this.order_sn,
								shop_id: this.goodsId,
								deal_price: this.goodsTotalMoney
							}
						};
						request("/api/pay_order", msg).then(res => {
							if (res.code == 200) {
								Indicator.close();
								this.$toast('提交成功');
								// this.$router.replace({
								// 	path: '/myorder',
								// 	query: {
								// 		tab: 1
								// 	}
								// })
							} else {
								this.$toast('提交失败');
							}
						});
					}
				});
			},
			goBackLastPage() {
				this.$router.back(-1);
			},
			clickPickCoupon() {
				sessionStorage.setItem('yhjArr', JSON.stringify(this.yhjArr));
				this.couponSign = true;
			},
			clickOkBtn(data) {
				console.log('确定优惠劵按钮')
				// 获取优惠劵id
				this.youhuiId = sessionStorage.getItem('youhuiId');
				this.couponSign = false;
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";

	.order-wrap .address {
		border-top: 1px solid #eee;
	}

	/* .order-wrap .mint-cell-reset {
		border-top: 1px solid #eee;
	} */

	>>>.mint-cell-wrapper {
		background-image: none;
	}
</style>
