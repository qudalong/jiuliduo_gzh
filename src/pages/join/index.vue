<template>
  <div class="join-wrap">
    <mt-header fixed title="招商加盟">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <img :src="img" alt />
  </div>
</template>

<script>
import request from '../../request/request'
export default {
  name: "Join",
  data() {
    return {
      img:'',
    };
  },
  mounted() {
    request('/api/play_join').then(res=>{
      // window.console.log(res);
      this.img=res.data.url[0];
    })
  }
};
</script>

<style scoped>
.join-wrap {
  width: 7.5rem;
  margin: 0 auto;
}
.join-wrap .mint-header{
    background: #fff;
    color: #333;
}
.join-wrap img {
  width: 7.5rem;
  height: auto;
  margin-top: 40px;
}
</style>
