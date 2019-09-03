// 二级导航组件
<template>
  <ul class="subnav-wrap clear">
    <li>
      <router-link to="/playintroduce">
        <img src="../../assets/index_05.png" alt />
        <p>玩法介绍</p>
      </router-link>
    </li>
    <li>
      <router-link to="/onsell">
        <img src="../../assets/index_07.png" alt />
        <p>挂卖商品</p>
      </router-link>
    </li>
    <li>
      <router-link to="/join">
        <img src="../../assets/index_09.png" alt />
        <p>招商加盟</p>
      </router-link>
    </li>
    <li>
      <router-link to="/share">
        <img src="../../assets/index_11.png" alt />
        <p>我要分享</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "SubNav",
  data() {
    return {};
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
