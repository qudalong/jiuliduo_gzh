<template>
	<div class="agent-wrap">
		<mt-header title="申请代理">
			<i slot="left" @click="goBackLastPage">
				<mt-button icon="back"></mt-button>
			</i>
		</mt-header>
		<div class="list clear">
			<img src="../../assets/1.png" alt />
			<mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
		</div>
		<div class="list clear">
			<img src="../../assets/2.png" alt />
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
		</div>
		<div class="list clear">
			<img src="../../assets/3.png" alt />
			<mt-field @click.native="pickAgentArea" label="申请代理地区" placeholder="请选择申请代理地区" readonly v-model="area">
				<i class="pick-city mint-toast-icon mintui mintui-back"></i>
			</mt-field>
		</div>
		<div class="submit-btn">
			<mt-button @click='daili' type="danger" size="large">申请成为代理商</mt-button>
		</div>
		<div v-if="pickSign">
			<agent-area v-on:pickArea="pickArea"></agent-area>
		</div>
	</div>
</template>
<script>
	import request from '../../request/request'
	import AgentArea from "../../components/AgentArea";
	export default {
		components: {
			AgentArea
		},
		name: "Agent",
		data() {
			return {
				name: "",
				phone: "",
				area: "",
				pickSign: false
			};
		},
		mounted() {
		
		},
		methods: {
			daili() {
				if (!this.name) {
					this.$toast("用户名不能为空");
					return;
				}
				if (!this.phone) {
					this.$toast("手机号不能为空");
					return;
				}
				if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
					this.$toast("请输入正确的手机号");
					return;
				}
				if (!this.area) {
					this.$toast("请选择代理区域");
					return;
				}
				let msg = {
					method: 'post',
					param: {
						name:this.name,
						mobile:this.phone,
						addres:this.area
					}
				};
				request("/api/proxy", msg).then(res => {
					if (res.code == 200) {
						this.$toast(res.message);
					}
				});
			},
			goBackLastPage() {
				this.$router.back(-1);
			},
			pickAgentArea() {
				this.pickSign = true;
			},
			pickArea(data) {
				console.log(123)
				let addr = JSON.parse(data);
				this.pickSign = false;
				if (data) {
					this.area = addr.province + addr.city + addr.area;
				} else {
					this.area = "";
				}
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
