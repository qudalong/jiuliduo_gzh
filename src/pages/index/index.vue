<template>
	<div class="home-wrap">
		<search></search>
		<banner></banner>
		<sub-nav></sub-nav>
		<goods-list></goods-list>
		<navbottom v-bind:active="activeKey"></navbottom>
	</div>
</template>

<script>
	const axios = require('axios');
	import request from '../../request/request'
	import Search from '../../components/Search';
	import Banner from '../../components/Banner';
	import SubNav from '../../components/SubNav';
	import GoodsList from '../../components/GoodsList';
	import Navbottom from '../../components/Nav';
	export default {
		components: {
			Search,
			Banner,
			SubNav,
			Navbottom,
			GoodsList
		},
		name: "Home",
		data() {
			return {
				activeKey: 'home',
				code: '',
				accessToken: '',
				openid2: ''
			}
		},
		mounted() {
			var url = location.search.split("?")[1];
			var para = url.split("&");
			var len = para.length;
			var res = {};
			var arr = [];
			for (var i = 0; i < len; i++) {
				arr = para[i].split("=");
				res[arr[0]] = arr[1];
			}
			this.code = res.code;
			this.access_token();
			// this.auth_user();
		},
		methods: {
			auth_user() {
				let msg = {
					method: 'POST',
					param: {
						open_id: 1
					}
				}
				request('/api/auth_user', msg).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.cardData = res.data;
						for (var i in data) {
							this.cardsList.push(data[i].card_sn)
						}
					}
				})
			},
			access_token() {
				var url =
					`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx73630bf4a0739fb5&secret=78e343effbebfe75b65c402298210165&code=${this.code}&grant_type=authorization_code`;
				axios.get(url)
					.then((response) => {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			// 获取用户信息
			userinfo(token, openid2) {
				var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid2}&lang=zh_CN`;
				axios.post(url)
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	};
</script>

<style scoped>
	@import "./index.css";
</style>
