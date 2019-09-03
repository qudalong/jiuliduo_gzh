<template>
	<div class="my-order-wrap">
		<mt-header fixed title="我的订单">
			<router-link to="/my" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<p style="height:40px"></p>
		<mt-navbar v-model="selected" @click.native="clickTab">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">已付款</mt-tab-item>
			<mt-tab-item id="3">已发货</mt-tab-item>
			<mt-tab-item id="4">已完成</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<ul>
					<li v-for="(item, index) in order" :key="index">
						<router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index,orderId:item.order_sn}}">
							<div class="goods-inf clear">
								<img :src="item.shop_img" alt />
								<div class="order-inf clear">
									<h4>{{item.shop_sketch}}</h4>
									<p class="price clear">
										<i>￥{{item.shop_price}}</i>
										<b>x1</b>
									</p>
									<p class="all-price">
										共1件商品 实际支付：
										<i>￥{{item.deal_price}}</i>
									</p>
									<p class="order-state">{{item.stu}}</p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<ul>
					<li class="used" v-for="(item, index) in order" :key="index">
						<router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index,orderId:item.order_sn}}">
							<div class="goods-inf clear">
								<img :src="item.shop_img" alt />
								<div class="order-inf clear">
									<h4>{{item.shop_sketch}}</h4>
									<p class="price clear">
										<i>￥{{item.shop_price}}</i>
										<b>x1</b>
									</p>
									<p class="all-price">
										共1件商品 实际支付：
										<i>￥{{item.deal_price}}</i>
									</p>
									<p class="order-state">已付款</p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<ul>
					<li class="out-date" v-for="(item, index) in order" :key="index">
						<router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index,orderId:item.order_sn}}">
							<div class="goods-inf clear">
								<img :src="item.shop_img" alt />
								<div class="order-inf clear">
									<h4>{{item.shop_sketch}}</h4>
									<p class="price clear">
										<i>￥{{item.shop_price}}</i>
										<b>x1</b>
									</p>
									<p class="all-price">
										共1件商品 实际支付：
										<i>￥{{item.deal_price}}</i>
									</p>
									<p class="order-state">已发货</p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<ul>
					<li class="out-date" v-for="(item, index) in order" :key="index">
						<router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index,orderId:item.order_sn}}">
							<div class="goods-inf clear">
								<img :src="item.shop_img" alt />
								<div class="order-inf clear">
									<h4>{{item.shop_sketch}}</h4>
									<p class="price clear">
										<i>￥{{item.shop_price}}</i>
										<b>x1</b>
									</p>
									<p class="all-price">
										共1件商品 实际支付：
										<i>￥{{item.deal_price}}</i>
									</p>
									<p class="order-state">已完成</p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	import request from "../../request/request";
	export default {
		components: {},
		name: "MyOrder",
		data() {
			return {
				selected: "",
				order: [],
			};
		},
		// watch:{
		// 	'$route' (to, from) {
		// 		this.post(); // 这是我ajax获取用户信息的方法
		// 	}
		// },
		mounted() {
			this.selected = this.$route.query.tab;
			console.log('this.$route.query.tab=' + this.$route.query.tab)
			console.log('this.selected=' + this.selected)
			this.post();
		},
		methods: {
			clickTab() {
				this.$router.push({
					path: "/myorder?tab=" + this.selected
				});
				this.post();
			},
			post() {
				let choose;
				if (this.selected == 1) {
					choose = '';
				} else if (this.selected == 2) {
					choose = 1;
				} else if (this.selected == 3) {
					choose = 2;
				} else if (this.selected == 4) {
					choose = 3;
				}
				let msg = {
					param: {
						is_stu: choose
					}
				};
				request("/api/order_detail", msg).then(res => {
					window.console.log(res);
					for (let i in res.data) {
						if (res.data[i].is_stu == 0) {
							res.data[i].stu = '未支付';
						} else if (res.data[i].is_stu == 1) {
							res.data[i].stu = '已支付';
						} else if (res.data[i].is_stu == 2) {
							res.data[i].stu = '已发货';
						}
					}
					this.order = res.data;
				});
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
