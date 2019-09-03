<template>
  <div class="points-list-wrap">
    <mt-header fixed title="我的积分">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <p style="height:40px"></p>
    <div class="score-out">
      <h4>{{sum}}</h4>
      <p>当前积分</p>
    </div>
    <div class="point-class clear">
      <button :class="{'active':isActive==='0'}" @click="clickPointsBtn('0')">
        <i>100</i>消费积分
      </button>
      <button :class="{'active':isActive==='1'}" @click="clickPointsBtn('1')">
        <i>100</i>互动积分
      </button>
    </div>
    <p class="inf-title clear">
      <i></i>
      <b>积分记录</b>
      <i></i>
    </p>
    <p class="lists" v-for="(item,index) in viewList" :key="index">
      <mt-cell :title="type==2?'挂卖成功送积分':'下级挂卖成功送积分'" :label="item.created_at" :value="'+'+item.stu_money"></mt-cell>
    </p>
  </div>
</template>
<script>
import request from "../../request/request";
import { Toast } from 'mint-ui';
export default {
  components: {},
  name: "Points",
  data() {
    return {
      isActive: "",
      viewList: [],
      type: 2,
      sum: '',
    };
  },
  mounted() {
    this.clickPointsBtn("0");
  },
  methods: {
    clickPointsBtn(data) {
      this.isActive = data;
      if(data == 0) {
        this.type = 2;
        this.post()
      } else {
        this.type = 1;
        this.post()
      }
    },
    post() {
      // request('')
      let msg = {
        method: 'post',
        param: {
          type: this.type
        }
      };
      request("/api/deliverys",msg).then(res => {
        window.console.log(res);
        if(res.code == 200){
          console.log(res.data)
          this.viewList = res.data.list
          this.sum = res.data.sum.split(".")[0]
        } else {
          // Toast({
          //   title: "温馨提示",
          //   message: "接口链接失败",
          //   showConfirmButton: true
          // })
        }
      });
    }
  }
};
</script>
<style scoped>
@import "./index.css";
.points-list-wrap .lists{
	border-bottom:1px solid #fff;
}
</style>
