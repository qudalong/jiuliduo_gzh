<template>
  <div class="playintroduce-wrap">
    <mt-header fixed title="玩法介绍">
      <i @click="goBackLastPage" slot="left">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <img :src="url" alt />
  </div>
</template>

<script>
import request from "../../request/request";
export default {
  name: "PlayIntroduce",
  data() {
    return {
      url:'',
    };
  },
  mounted() {
    request("/api/play_detail").then(res => {
      console.log(res)
      window.console.log(res.data.url[0]);
      this.url=res.data.url[0];
    });
  },
  methods: {
    goBackLastPage() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.playintroduce-wrap {
  width: 7.5rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  background: #fff;
}
.playintroduce-wrap .mint-header {
  background: #fff;
  color: #333;
}
.playintroduce-wrap img {
  width: 5.8rem;
  height: auto;
  display: block;
  margin: 40px auto 0;
}
</style>
