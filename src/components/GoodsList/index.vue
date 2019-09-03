<template>
	<div class="goods-list-wrap clear">
		<div class="goods-list-item" v-for="(value,key) in GoodsList" :key="key">
			<router-link :to="{path:'/goodsdetail',query: {goodsId: value.id}}">
				<img :src="value.imgurl" alt />
				<p>{{value.shop_sketch}}</p>
				<h4>￥{{value.fracture_price}}</h4>
			</router-link>
		</div>
	</div>
</template>

<script>
	import request from "../../request/request";
	import VueEvent from '../../store/modules/vueEvent.js';
	export default {
		name: "GoodsList",
		data() {
			return {
				GoodsList: ["1", "2", "3", "4", "5", "6"],
				goodsClass: '',
			};
		},
		watch: {
			goodsClass(val) {
				this.post(val)
			}
		},
		mounted() {
			var _this = this;
			// window.console.log(request);
			_this.post('0');
			VueEvent.$on('goodsClass', function(data) {
				_this.goodsClass = data;
			})
		},
		methods: {
			post(types) {
				var msg = {};
				console.log('--------参数---------')
				console.log(types)
				if (types == 'p0' || types == 'p1' || types == 'p2') {
					var type = 2;
					var money=0;
					if (types == 'p0') {
						money = '99';
					} else if (types == 'p1') {
						money = '198';
					} else if (types == 'p2') {
						money = '396';
					} 
					msg = {
						method: 'get',
						param: {
							type: type,
							money: money
						}
					}
				} else {
					msg = {
						method: 'get',
						param: {
							type: types
						}
					}
				}
				// window.console.log(msg)
				request('/api/shop_show', msg).then(res => {
					window.console.log(res)
					if (res.code == 200) {
						this.GoodsList = res.data;
						for (let i in res.data) {
							res.data[i].imgurl = res.data[i].shop_img[0]
						}
					}
				})
			}
		}
	};
</script>

<style scoped>
	@import "./index.css";
</style>
