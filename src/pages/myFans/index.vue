<template>
	<div class="my-fans-wrap">
		<mt-header title="我的粉丝">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<ul class="fans-list">
			<li class="clear">
				<p>姓名</p>
				<p>联系方式</p>
			</li>
			<li class="clear" v-for="item in fenshiList">
				<p>{{item.nickname}}</p>
				<p>{{item.bind_phone}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "MyFans",
		data() {
			return {
				fenshiList: []
			};
		},
		mounted() {
			this.fenshi();
		},
		methods: {
			fenshi() {
				request('/api/fan_list').then(res => {
					if (res.code == 200) {
						this.fenshiList = res.data
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
