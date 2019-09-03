<template>
  <div class="my-wrap">
    <div class="head-wrap clear">
      <img :src="userInfo.avatar" alt />
      <div class="head-inf">
        <router-link to="/person">
          <h4>
            {{userInfo.nickname}}
            <i class="mint-toast-icon mintui mintui-back"></i>
          </h4>
        </router-link>
        <p>
          <router-link to="/openvip" >
            <mt-badge class="no-vip" size="small" color="#fff" v-if="userInfo.is_vip==0">开通会员</mt-badge>
            <mt-badge class="vip" size="small" color="#FFFF00" v-else>会员</mt-badge>
          </router-link>
        </p>
      </div>
    </div>
    <div class="my-menu-list-wrap">
      <h4>我的订单</h4>
      <ul>
        <li>
          <router-link to="/myorder?tab=2">
            <img src="../../assets/madd_03.png" alt />
            <p>已付款</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myorder?tab=3">
            <img src="../../assets/madd_05.png" alt />
            <p>已发货</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myorder?tab=4">
            <img src="../../assets/madd_07.png" alt />
            <p>已完成</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myorder?tab=1">
            <img src="../../assets/madd_09.png" alt />
            <p>全部订单</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="my-menu-list-wrap">
      <h4>我的钱包</h4>
      <ul>
        <li>
          <router-link to="/points">
            <img src="../../assets/madd_16.png" alt />
            <p>积分</p>
          </router-link>
        </li>
        <li>
          <router-link to="/mycoupon">
            <img src="../../assets/madd_18.png" alt />
            <p>折扣券</p>
          </router-link>
        </li>
        <li>
          <router-link to="/cashout">
            <img src="../../assets/madd_20.png" alt />
            <p>提现</p>
          </router-link>
        </li>
        <li>
          <router-link to="/cashoutlist">
            <img src="../../assets/madd_23.png" alt />
            <p>提现记录</p>
          </router-link>
        </li>
      </ul>
    </div>
    <p class="menu-list">
      <mt-cell title="挂卖商品" to="/onsell" is-link>
        <img slot="icon" src="../../assets/my_03.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="我的银行卡" to="/mybankcard" is-link>
        <img slot="icon" src="../../assets/my_06.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="收货地址" to="/myaddress" is-link>
        <img slot="icon" src="../../assets/my_08.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="我的粉丝" to="/myFans" is-link>
        <img slot="icon" src="../../assets/my_10.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="申请代理" to="/agent" is-link>
        <span>申请代理商</span>
        <img slot="icon" src="../../assets/my_12.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="会员协议" to="/vipagree" is-link>
        <img slot="icon" src="../../assets/my_14.png" />
      </mt-cell>
    </p>
    <p class="menu-list">
      <mt-cell title="客服电话">
        <span>400-888-8888</span>
        <img slot="icon" src="../../assets/my_16.png" />
      </mt-cell>
    </p>
    <navbottom v-bind:active="activeKey"></navbottom>
  </div>
</template>
<script>
import Navbottom from "../../components/Nav";
import request from '../../request/request';
export default {
  components: {
    Navbottom
  },
  name: "My",
  data() {
    return {
      activeKey: "my",
      userInfo: {}
    };
  },
  mounted() {
    this.post()
  },
  methods: {
    post(){
      let msg={
        method:'get'
      }
      request('/api/personal_info',msg).then(res=>{
        window.console.log(res)
        this.userInfo=res.data;
      })
    }
  }
};
</script>
<style scoped>
@import "./index.css";
>>>.is-primary{
	color: #FD5F65 !important;
}
>>>.mint-cell{
	background:none;
}
</style>
