<template>
  <div class="my-bank-card-wrap">
    <mt-header title="我的银行卡">
      <i slot="left" @click="goBackLastPage">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <div class="carditem" v-for="(list,index) in card" :key="index">
      <div>{{list.catd_branch}}({{list.card_num}})</div>
      <div class="detail" @click="det" :data-index="index" :data-id="list.id">删除</div>
    </div>

    <mt-cell title="添加银行卡" is-link to="/addbankcard"></mt-cell>
  </div>
</template>
<script>
import request from "../../request/request";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  components: {},
  name: "MyBankCard",
  data() {
    return {
      card: []
    };
  },
  mounted() {
    this.post();
  },
  methods: {
    goBackLastPage() {
      this.$router.back(-1);
    },
    post() {
      let msg = {
        method: "POST"
      };
      request("/api/bindBank/list", msg).then(res => {
        // window.console.log(res);
        for (let i in res.data) {
          res.data[i].card_num = res.data[i].card_sn.slice(-4);
        }
        this.card = res.data;
      });
    },
    det(e) {
      var _this = this;
      var id = e.target.dataset.id;
      var index = e.target.dataset.index;
      MessageBox.confirm("是否删除?").then(action => {
        if (action == "confirm") {
          let msg = {
            param: {
              id: id
            }
          };
          request("/api/bindBank/deleted", msg).then(res => {
            window.console.log(res);
            if(res.code==200){
              var cards = [];
              for (let i in _this.card) {
                if(index !== i) {
                  cards.push(_this.card[i])
                }
              }
              _this.card = cards;
              console.log(_this.card)
              Toast('删除成功');
            }else{
              Toast('删除失败');
            }
          });
        }
      }).catch(err => { 
        console.log('取消');
      });
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
