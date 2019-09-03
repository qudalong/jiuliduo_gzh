<template>
  <div class="my-coupon-list-wrap">
    <mt-header fixed title="折扣券">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <p style="height:40px"></p>
    <mt-navbar v-model="selected" @click.native="clickTab">
      <mt-tab-item id="1">未使用</mt-tab-item>
      <mt-tab-item id="2">已使用</mt-tab-item>
      <!-- <mt-tab-item id="3">已过期</mt-tab-item> -->
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul>
          <li v-for="(item, index) in selectedList" :key="index">
            <div class="coupon-inf clear">
              <div class="discount">
                {{item.fracture}}
                <span>折</span>
              </div>
              <div class="range">
                <h4>折扣券</h4>
                <p>适用范围：所有商品</p>
              </div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul>
          <li class="used" v-for="(item, index) in selectedList" :key="index">
            <div class="coupon-inf clear">
              <div class="discount">
                {{item.fracture}}
                <span>折</span>
              </div>
              <div class="range">
                <h4>折扣券</h4>
                <p>适用范围：所有商品都可以使用</p>
              </div>
              <img src="../../assets/had.png" alt />
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="3">
        <ul>
          <li class="out-date" v-for="(item, index) in selectedList" :key="index">
            <div class="coupon-inf clear">
              <div class="discount">
                {{item.fracture}}
                <span>折</span>
              </div>
              <div class="range">
                <h4>折扣券</h4>
                <p>适用范围：所有商品</p>
              </div>
              <img src="../../assets/out.png" alt />
            </div>
          </li>
        </ul>
      </mt-tab-container-item> -->
    </mt-tab-container>
  </div>
</template>
<script>
import request from "../../request/request";
export default {
  components: {},
  name: "MyCoupon",
  data() {
    return {
      selected: "1",
      selectedList:[]
  }
  },
  created() {
      let msg={
        param:{
          type:this.selected
        }
      }
      request("/api/list_coupon",msg).then(res =>{
        this.selectedList=res.data
        // console.log(this.selectedList)
    })
  },
  methods: {
    clickTab() {
        let msg={
          param:{
            type:this.selected
          }
      }
      request("/api/list_coupon",msg).then(res =>{
        this.selectedList=res.data
        // console.log(this.selectedList)
    })
    }
  }
};
</script>
<style scoped>
@import "./index.css";
>>>.mint-navbar .mint-tab-item.is-selected{
	border-bottom:0;
}
</style>
