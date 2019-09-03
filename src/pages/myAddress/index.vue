<template>
	<div class="my-address-wrap">
		<mt-header title="收货地址">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<mt-cell title="添加收货地址" :to="{path:'/address',query: {isc:1}}" is-link></mt-cell>
		<div @click="addAdress(index)"  class="address-list clear" :class="{'act':index==ind}" v-for="(list,index) in addlist" :key="index">
			<!-- <div class="img">
        <img src="../../assets/p.png" alt />
      </div> -->
			<div class="middle">
				<div class="middle-name">{{list.name}}
					<span>{{list.phone}}</span>
				</div>
				<div>{{list.province}}{{list.city}}{{list.area}}{{list.detailed}}</div>
			</div>
			<router-link class="edit-address" :to="{path:'/address',query: {isc:0,listData:list}}">编辑</router-link>
		</div>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "MyAddress",
		data() {
			return {
				addlist: [],
				ind:0
			};
		},
		created() {
			this.post();
		},
		mounted(){
			this.ind=localStorage.getItem('index');
		},
		methods: {
			addAdress(index) {
				for (var i in this.addlist) {
					if (index == i) {
						var targetAd = this.addlist[i];
						console.log('index='+index)
						localStorage.setItem('index',index);
						localStorage.setItem('name',targetAd.name);
						localStorage.setItem('phone',targetAd.phone);
						localStorage.setItem('address',targetAd.province+targetAd.city+targetAd.area+targetAd.detailed);
						this.$router.push({path:'/order'});
					}
				}
			},
			goBackLastPage() {
				this.$router.back(-1);
			},
			post() {
				let msg = {
					method: 'POST'
				}
				request('/api/addres/list', msg).then(res => {
					window.console.log(res)
					this.addlist = res.data;
				})
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
	.act{
		border:1px solid red !important;
	}
</style>
