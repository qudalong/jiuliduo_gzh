// 搜索组件
<template>
  <div class="search-wrap">
    <!-- <img src="../../assets/search.png" alt=""> -->
    <mt-search v-model="value" placeholder="请输入关键词" @keyup.native.enter="search(value)"></mt-search>
    <!-- <input type="text" v-model="value" placeholder="请输入关键词">
    <span>搜索</span> -->
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      value:'',
    };
  },
  methods:{
    search(value){
      window.console.log(value);
    }
  }
};
</script>
<style scoped>
@import "./index.css";

</style>
