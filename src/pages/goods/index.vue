<template>
  <div class="goods-wrap">
    <search></search>
    <banner></banner>
    <goods-filter></goods-filter>
    <goods-list></goods-list>
    <navbottom v-bind:active="activeKey"></navbottom>
  </div>
</template>
<script>
import Search from "../../components/Search";
import Banner from "../../components/Banner";
import GoodsList from "../../components/GoodsList";
import Navbottom from "../../components/Nav";
import GoodsFilter from "../../components/GoodsFilter";
export default {
  components: {
    Search,
    Banner,
    Navbottom,
    GoodsList,
    GoodsFilter
  },
  name: "Goods",
  data() {
    return {
      activeKey: "goods"
    };
  },
  mounted() {}
};
</script>
<style scoped>
@import "./index.css";
</style>
