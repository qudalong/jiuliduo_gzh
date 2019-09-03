import Router from 'vue-router';
import Vue from 'vue';
import Index from '../pages/index/index';
import Goods from '../pages/goods/index';
import My from '../pages/my/index';
import Join from '../pages/join/index';
import PlayIntroduce from '../pages/playIntroduce/index';
import Share from '../pages/share/index';
import GoodsDetail from '../pages/goodsDetail/index';
import Order from '../pages/order/index';
import Cashout from '../pages/cashout/index';
import CashoutList from '../pages/cashoutList/index';
import Points from '../pages/points/index';
import MyCoupon from '../pages/myCoupon/index';
import MyOrder from '../pages/myOrder/index';
import MyOrderDetail from '../pages/myOrderDetail/index';
import ExpressState from '../pages/expressState/index';
import VipAgree from '../pages/vipAgree/index';
import MyFans from '../pages/myFans/index';
import Person from '../pages/person/index';
import Bindphone from '../pages/bindphone/index';
import Onsell from '../pages/onsell/index';
import Openvip from '../pages/openvip/index';
import MyBankCard from '../pages/myBankCard/index';
import AddBankCard from '../pages/addBankCard/index';
import Agent from '../pages/agent/index';
import MyAddress from '../pages/myAddress/index';
import Address from '../pages/address/index';

Vue.use(Router)

const loadView = (view) => {
	return () => import(`../pages/${view}/index.vue`) //路由懒加载，但是好像没什么用
}
const router = new Router({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes: [{
			path: '/',
			component: Index,
			redirect: "/index",
		}, {
			path: "/index",
			name: "首页",
			component: Index
		}, {
			path: "/goods",
			name: "商品",
			component: loadView('goods')
		}, {
			path: "/my",
			name: "我的",
			component: loadView('my')
		}, {
			path: "/join",
			name: "招商加盟",
			component: Join
		}, {
			path: "/playintroduce",
			name: "玩法介绍",
			component: PlayIntroduce
		}, {
			path: "/share",
			name: "我要分享",
			component: Share
		}, {
			path: "/goodsdetail",
			name: "商品详情",
			component: GoodsDetail
		}, {
			path: "/order",
			name: "提交订单",
			component: Order
		}, {
			path: "/cashout",
			name: "提现",
			component: Cashout
		}, {
			path: "/cashoutlist",
			name: "提现记录",
			component: CashoutList
		}, {
			path: "/points",
			name: "积分",
			component: Points
		}, {
			path: "/mycoupon",
			name: "折扣券",
			component: MyCoupon
		}, {
			path: "/myorder",
			name: "我的订单",
			component: MyOrder
		}, {
			path: "/myorderdetail",
			name: "订单详情",
			component: MyOrderDetail
		}, {
			path: "/expressstate",
			name: "查看物流",
			component: ExpressState
		}, {
			path: "/vipagree",
			name: "会员协议",
			component: VipAgree
		}, {
			path: "/myfans",
			name: "我的粉丝",
			component: MyFans
		}, {
			path: "/person",
			name: "个人信息",
			component: Person
		}, {
			path: "/bindphone",
			name: "绑定手机号",
			component: Bindphone
		}, {
			path: "/onsell",
			name: "挂卖商品",
			component: Onsell
		}, {
			path: "/openvip",
			name: "开通会员",
			component: Openvip
		}, {
			path: "/mybankcard",
			name: "我的银行卡",
			component: MyBankCard
		}, {
			path: "/addbankcard",
			name: "添加银行卡",
			component: AddBankCard
		}, {
			path: "/agent",
			name: "申请代理商",
			component: Agent
		}, {
			path: "/myaddress",
			name: "收货地址",
			component: MyAddress
		}, {
			path: "/address",
			name: "新增/修改收货地址",
			component: Address
		},
		{
			path: '*',
			component: Index,
			redirect: "/index",
		}
	]
})

export default router
