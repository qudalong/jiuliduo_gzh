<template>
  <div class="my-order-wrap">
    <mt-header fixed title="挂卖商品">
      <i @click="goBackLastPage" slot="left">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <p style="height:40px"></p>
    <mt-navbar v-model="selected" @click.native="clickTab">
      <mt-tab-item id="1">挂卖中</mt-tab-item>
      <mt-tab-item id="2">已售出</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul>
          <li v-for="(item, index) in pending" :key="index">
            <!-- <router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index}}"> -->
              <div class="goods-inf clear">
                <img :src="item.shop_img" alt />
                <div class="order-inf clear">
                  <h4>{{item.shop_sketch}}</h4>
                  <p class="price clear">
                    <i>￥{{item.shop_price}}</i>
                    <b>x1</b>
                  </p>
                  <p class="order-state">挂卖中</p>
                </div>
              </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul>
          <li class="used" v-for="(item, index) in pending" :key="index">
            <!-- <router-link :to="{path:'/myorderdetail',query: {myOrderId: item+index}}"> -->
              <div class="goods-inf clear">
                <img :src="item.shop_img" alt />
                <div class="order-inf clear">
                  <h4>{{item.shop_sketch}}</h4>
                  <p class="price clear">
                    <i>￥{{item.shop_price}}</i>
                    <b>x1</b>
                  </p>
                  <p class="order-state">已售出</p>
                </div>
              </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import request from '../../request/request'
export default {
  components: {},
  name: "Onsell",
  data() {
    return {
      selected: "1",
      pending:[],
    };
  },
  mounted() {
      this.post();
  },
  methods: {
    clickTab() {
      window.console.log(this.selected);
      this.post();
    },
    goBackLastPage() {
      this.$router.back(-1);
    },
    post(){
      let msg={
        param:{
          is_stu:this.selected
        }
      }
      request('/api/pending_order',msg).then(res=>{
        window.console.log(res);
        this.pending=res.data;
      })
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
