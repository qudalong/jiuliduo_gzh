<template>
  <div class="share-wrap">
    <mt-header fixed title="我要分享">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <img src="../../assets/share.png" alt @click="clickShareBtn" />
      </mt-button>
    </mt-header>
    <div class="share-mark-img">
      <img src="../../assets/mark_03.png" alt />
      <p>买的多赚得多！</p>
    </div>
    <div v-if="shareSign">
      <share-detail v-on:cancleShare="cancleShareBtn"></share-detail>
    </div>
  </div>
</template>
<script>
import ShareDetail from "../../components/ShareDetail";
export default {
  components: { ShareDetail },
  name: "Share",
  data() {
    return {
      shareSign: false
    };
  },
  mounted() {},
  methods: {
    clickShareBtn() {
      this.shareSign = true;
    },
    cancleShareBtn(data) {
      this.shareSign = data;
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
