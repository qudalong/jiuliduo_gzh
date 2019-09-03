<template>
	<!-- 地区选择 -->
	<div class="cash-out-wrap">
		<div class="cash-out-head">
			<mt-header title="提现">
				<router-link to="/my" slot="left">
					<mt-button icon="back"></mt-button>
				</router-link>
			</mt-header>
			<p class="cash-out-money">
				<i>可提现</i>
				<b>{{jifenSum}}</b>
			</p>
		</div>
		<div class="cash-out-inf-list clear">
			<img src="../../assets/t1.png" alt />
			<mt-field label="提现额度" values='123' placeholder="请输入提现额度" v-model="money"></mt-field>
		</div>
		<div class="cash-out-inf-list clear row1">
			<img src="../../assets/t2.png" alt style='margin-top: 1px; padding: 10px 0;' />
			<lable class="lab" style='width:77px'>提现账号</lable>
			<div @click="showBankDialog" v-show='!cardNum' class="bankCard">请选择银行卡号<span style="margin-left: 50px;">></span></div>
			<div @click="showBankDialog" v-show='cardNum' class="bankCard">{{cardNum}}<span style="margin-left: 50px;">></span></div>
			<!-- 银行卡弹窗 -->
			<div @click.stop="colseBankDialog" v-show="showBankDialogFlag" class="cover-bg">
			</div>
			<div v-show="showBankDialogFlag" class="select-wrap">
				<router-link :to="{path:'/mybankcard'}">
					<div class="link">添加银行卡<span class="icon-right">></span></div>
				</router-link>
				<select @change="onChange" class="inpt" style="border:none">
					<option value="11">请选择银行卡号</option>
					<option v-for='item in cardsList' :value="item">{{item}}</option>
				</select>
			</div>
		</div>
		<div class="cash-out-inf-list clear">
			<img src="../../assets/t3.png" alt />
			<mt-field label="手机号" type="tel" placeholder="请输入手机号" v-model="phoneNumber">
				<input id="yzmBtn" type="button" value="获取验证码" @click="sendSms" style="padding:8px;background: #FD5F65;color: #fff;border-radius: 3px;border:none;" />
			</mt-field>
		</div>
		<div class="cash-out-inf-list clear">
			<img src="../../assets/t4.png" alt />
			<mt-field label="验证码" placeholder="请输入验证码" v-model="code"></mt-field>
		</div>

		<div class="submit-btn">
			<mt-button @click='tixian' type="danger" size="large">完成</mt-button>
		</div>
		<p class="tips">
			每周二周五打款,提现手续费：3.00%
			提现申请每周一周四17点截止
		</p>
	</div>
</template>
<script>
	import request from '../../request/request'
	export default {
		components: {},
		name: "Cashout",
		data() {
			return {
				money: '',
				cardId: '',
				phoneNumber: '',
				code: '',
				jifenSum: '',
				cardsList: [],
				cardData: [],
				showBankDialogFlag: false,
				cardNum: 0
			};
		},
		mounted() {
			this.jifen();
			this.cardList();
		},
		methods: {
			colseBankDialog() {
				this.showBankDialogFlag = false;
			},
			showBankDialog() {
				this.showBankDialogFlag = true;
			},
			onChange(e) {
				var value = e.target.value;
				for (var i in this.cardData) {
					if (this.cardData[i].card_sn == value) {
						this.cardId = this.cardData[i].id;
						this.cardNum = this.cardData[i].card_sn;
						this.showBankDialogFlag = false;
					}
				}
			},
			cardList() {
				let msg = {
					method: 'POST'
				}
				request('/api/bindBank/list', msg).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.cardData = res.data;
						for (var i in data) {
							this.cardsList.push(data[i].card_sn)
						}
					}
				})
			},
			jifen() {
				let msg = {
					method: 'POST',
					param: {
						type: 1
					}
				}
				request('/api/deliverys', msg).then(res => {
					if (res.code == 200) {
						this.jifenSum = res.data.sum.split(".")[0]
					}
				})
			},
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
			tixian() {
				if (!this.money) {
					this.$toast("请输入提现额度");
					return;
				}
				if (!this.cardId) {
					this.$toast("提现账号不能为空");
					return;
				}
				if (!this.phoneNumber) {
					this.$toast("手机号不能为空");
					return;
				}
				if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phoneNumber)) {
					this.$toast("请输入正确的手机号");
					return;
				}
				if (!this.code) {
					this.$toast("请输入验证码");
					return;
				}
				let msg = {
					method: 'POST',
					param: {
						money: this.money,
						mobile: this.phoneNumber,
						account: this.cardId,
						code: this.code
					}
				}
				request('/api/atm', msg).then(res => {
					if (res.code == 200) {
						this.$toast('提现成功');
						this.jifen();
						this.$router.push({
							path: "/cashoutlist"
						})
					}
					// window.console.log(res)
					// this.bannerList=res.data.url;
				})
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";

	>>>.mint-field .mint-cell-title {
		width: 76px;
	}
	>>>.mint-cell-wrapper{
		background-image:none;
	}

	.bankCard {
		flex: 1;
	}

	.icon-right {
		float: right;
	}

	.cover-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 700;
	}

	.select-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		width: -webkit-fit-content;
		background: #fff;
		z-index: 800;
		border-radius: 3px;
	}

	.select-wrap .link {
		margin-bottom: 10px;
		background: red;
		color: #fff;
		text-align: center;
		padding: 10px;
	}

	.inpt {
		width: 200px;
		background: #ECECEC;
		padding: 6px 10px;
	}

	.lab {
		margin-left: 8px;
		color: #333;
		width: 70Spx;
	}

	.row1 {
		display: flex;
		align-items: center;
	}

	.disable {
		background: #ccc !important;
		color: #000 !important;
	}
</style>
