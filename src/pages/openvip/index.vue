<template>
  <div class="openvip-wrap">
    <mt-header title="开通会员">
      <i slot="left" @click="goBackLastPage">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <div class="banner">
      <img src="../../assets/vip_02.png" alt />
    </div>
    <mt-cell title="玩法介绍" is-link to="/playintroduce">
      <img slot="icon" src="../../assets/xy.png" width="24" height="24" />
    </mt-cell>
    <mt-cell title="会员协议" is-link to="/vipagree">
      <img slot="icon" src="../../assets/xy2.png" width="24" height="24" />
    </mt-cell>
    <p class="agree-radio">
      <input type="radio" name="xy" value="1" v-model="value" @change="clickAgree" />
      <i>知晓并同意以上协议</i>
    </p>
    <div class="submit-btn">
      <button :class="{'active':value==='1'}">开通会员</button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Openvip",
  data() {
    return {
      value: ""
    };
  },
  mounted() {},
  methods: {
    goBackLastPage() {
      this.$router.back(-1);
    },
    clickAgree() {
      console.log(this.value);
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
