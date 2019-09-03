// 导航组件
<template>
  <div>
    <p class="placehold-box"></p>
    <ul class="nav-wrap clear">
      <li :class="{'active':active==='home'}">
        <router-link to="/index">
          <img src="../../assets/n1.png" alt class="normal" />
          <img src="../../assets/n1a.png" alt class="pink" />
          <p>首页</p>
        </router-link>
      </li>
      <li :class="{'active':active==='goods'}">
        <router-link to="/goods">
          <img src="../../assets/n2.png" alt class="normal" />
          <img src="../../assets/n2a.png" alt class="pink" />
          <p>商品</p>
        </router-link>
      </li>
      <li :class="{'active':active==='my'}">
        <router-link to="/my">
          <img src="../../assets/n3.png" alt class="normal" />
          <img src="../../assets/n3a.png" alt class="pink" />
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Nav",
  props: ["active"],
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style scoped>
@import "./index.css";
</style>
