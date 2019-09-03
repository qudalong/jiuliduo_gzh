<template>
	<div class="coupon-wrap">
		<div class="coupon-list">
			<ul class="coupons">
				<li class="clear" v-for="(value,key) in yhjA">
					<div class="coupon-inf clear">
						<div class="discount">
							{{value.fracture}}
							<span>折</span>
						</div>
						<div class="range">
							<h4>折扣券</h4>
							<p>适用范围：所有商品</p>
						</div>
					</div>
					<input type="radio" name="coupon" @click="clickCouponRadio(value)" />
				</li>
			</ul>
			<div class="ok-btn">
				<mt-button type="danger" size="large" @click="clickOkBtn">确定</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "Banner",
		data() {
			return {
				yhjA: [],
				zhekou: 100,
				zhekouId:0
			};
		},
		created() {
			this.yhjA = JSON.parse(sessionStorage.getItem('yhjArr'));
		},
		methods: {
			clickCouponRadio(data) {
				console.log("选中的是");
				console.log(data.fracture);
				this.zhekou = data.fracture;
				this.zhekouId = data.id;
				sessionStorage.setItem('youhuiId',data.id);
			},
			clickOkBtn() {
				this.$emit("clickOkBtn", false);
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
