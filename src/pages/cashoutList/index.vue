<template>
	<div class="cash-out-list-wrap">
		<mt-header fixed title="提现记录">
			<router-link to="/my" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<p style="height:40px"></p>
		<div class="score-out">
			<h4>{{jifenSum}}</h4>
			<p>当前积分</p>
		</div>
		<p class="inf-title clear">
			<i></i>
			<b>提现记录</b>
			<i></i>
		</p>
		<p class="lists" v-for="item in jiluList">
			<mt-cell :title="item.catd_branch+'积分提现成功'" :label="item.updated_at" :value="-item.get_money"></mt-cell>
		</p>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "CashoutList",
		data() {
			return {
				jiluList: [],
				jifenSum:0
			};
		},
		mounted() {
			this.atm_list();
			this.jifen();
		},
		methods: {
			jifen() {
				let msg = {
					method: 'POST',
					param: {
						type:1
					}
				}
				request('/api/deliverys',msg).then(res => {
					if (res.code == 200) {
						this.jifenSum = res.data.sum.split(".")[0]
					}
				})
			},
			atm_list() {
				request('/api/atm_list').then(res => {
					if (res.code == 200) {
						this.jiluList = res.data
					}
				})
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
	.cash-out-list-wrap .lists{
		border-bottom:1px solid #fff;
	}
</style>
