<template>
	<div class="person-wrap">
		<mt-header title="个人信息">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<mt-cell title="头像" is-link>
			<span>
				<img :src="info.avatar" alt />
			</span>
		</mt-cell>
		<mt-cell title="昵称">
			<span>{{info.nickname}}</span>
		</mt-cell>
		<mt-cell title="绑定手机号" is-link to="/bindphone">
		</mt-cell>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "Person",
		data() {
			return {
				info:''
			};
		},
		mounted() {
			this.gerenInfo();
		},
		methods: {
			gerenInfo() {
				request('/api/personal_info').then(res => {
					if (res.code == 200) {
						this.info = res.data
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
