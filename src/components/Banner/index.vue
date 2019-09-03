// 轮播组件
<template>
  <div class="banner-wrap">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(value,key) in bannerList" :key="key">
        <img v-bind:src="value" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import request from '../../request/request'
import bannerImg from "../../assets/index_02.png";
export default {
  name: "Banner",
  data() {
    return {
      bannerList: []
    };
  },
  mounted(){
    request('/api/banner').then(res=>{
      // window.console.log(res)
      this.bannerList=res.data.url;
    })
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
