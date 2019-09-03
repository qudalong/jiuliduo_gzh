<template>
	<div class="bind-phone-wrap">
		<mt-header title="绑定手机号">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<mt-field label placeholder="请输入手机号" v-model="phoneNumber"></mt-field>
		<mt-field label placeholder="请输入验证码" v-model="phoneNumberCode">
			<input id="yzmBtn" type="button" value="获取验证码" @click="sendSms" style="padding:8px;background: #FD5F65;color: #fff;border-radius: 3px;border:none;" />
		</mt-field>
		<div class="submit-btn">
			<mt-button @click='bindMobile' type="danger" size="large">完成</mt-button>
		</div>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "Bindphone",
		data() {
			return {
				phoneNumber: "",
				phoneNumberCode: ""
			};
		},
		mounted() {},
		methods: {
			sendSms() {
				if (!this.phoneNumber) {
					this.$toast("手机号不能为空");
					return;
				}
				if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phoneNumber)) {
					this.$toast("请输入正确的手机号");
					return;
				}
				var oBtn = document.getElementById('yzmBtn');
				var flag = true;
				var time = 60;
				oBtn.setAttribute("disabled", true);
				oBtn.value = '发送中...';

				let msg = {
					method: 'POST',
					param: {
						mobile: this.phoneNumber
					}
				}
				request('/api/send_sms', msg).then(res => {
					if (res.code == 200) {
						this.$toast(res.message);
						if (flag) {
							flag = false;
							var timer = setInterval(() => {
								oBtn.classList.add('disable');
								time--;
								oBtn.value = time + ' 秒';
								if (time === 0) {
									clearInterval(timer);
									oBtn.value = '重新获取';
									oBtn.classList.remove('disable');
									oBtn.removeAttribute("disabled");
									flag = true;
								}
							}, 1000)
						}
					}
				})
			},
			bindMobile() {
				if (!this.phoneNumber) {
					this.$toast("手机号不能为空");
					return;
				}
				if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phoneNumber)) {
					this.$toast("请输入正确的手机号");
					return;
				}
				if (!this.phoneNumberCode) {
					this.$toast("请输入验证码");
					return;
				}
				let msg = {
					method: 'POST',
					param: {
						mobile: this.phoneNumber,
						code: this.phoneNumberCode
					}
				}
				request('/api/bind_mobile', msg).then(res => {
					if (res.code == 200) {
						this.$toast(res.message);
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
	.disable{
		background: #ccc !important;
		color: #000 !important;
	}
</style>
