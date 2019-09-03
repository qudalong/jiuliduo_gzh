<template>
  <div class="add-bank-card-wrap">
    <mt-header title="添加银行卡">
      <i slot="left" @click="goBackLastPage">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <mt-field label="开户银行" placeholder="请输入开户银行" v-model="bankCard"></mt-field>
    <mt-field label="开户行全称" placeholder="请输入开户行全称" v-model="bank"></mt-field>
    <mt-field label="开户名" placeholder="请输入开户名" type="text" v-model="bankName"></mt-field>
    <mt-field label="开户银行卡号" placeholder="请输入开户银行卡号" v-model="cardId"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" v-model="code">
      <button class="code" :disabled="disabled" @click="getcode()">{{auth_code}}</button>
    </mt-field>
    <div class="submit-btn">
      <mt-button type="danger" size="large" @click="add()">确定</mt-button>
    </div>
  </div>
</template>
<script>
import request from "../../request/request";
import { Toast } from "mint-ui";
export default {
  components: {},
  name: "AddBankCard",
  data() {
    return {
      bankCard: "",
      bank: "",
      bankName: "",
      cardId: "",
      phone: "",
      code: "",
      disabled: false,
      auth_code: "获取验证码",
      onlinecode: "" //线上code
    };
  },
  mounted() {},
  methods: {
    goBackLastPage() {
      this.$router.back(-1);
    },
    getcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "" || !reg.test(this.phone)) {
        Toast("请填写正确的手机号码");
        return;
      }
      let that = this;
      that.auth_code = 60;
      that.disabled = true;
      //倒计时主要部分，利用定时器
      let getsix = setInterval(function() {
        let times = that.auth_code - 1;
        that.auth_code = times;
        if (that.auth_code < 1) {
          clearInterval(getsix);
          that.auth_code = "获取验证码";
          that.disabled = false;
        }
      }, 1000);
      let msg = {
        param: {
          mobile: this.phone
        },
        method: "POST"
      };
      request("/api/send_sms", msg).then(res => {
        if (res.code == 200) {
          this.onlinecode = res.data.code;
          Toast("发送验证码成功");
        } else {
          that.auth_code = "获取验证码";
          that.disabled = false;
          Toast("发送验证码失败");
        }
      });
    },
    add() {
      if (
        this.bankCard == "" ||
        this.bank == "" ||
        this.bankName == "" ||
        this.cardId == "" ||
        this.phone == "" ||
        this.code == ""
      ) {
        Toast("所有内容均不能为空");
        return;
      } else if (this.code != this.onlinecode) {
        Toast("请重新填写验证码");
        return;
      }
      let that=this;
      let msg = {
        param: {
          card_name: this.bankCard,
          catd_branch: this.bank,
          card_people: this.bankName,
          card_sn: this.cardId,
          is_lev:0
        },
        method: "POST"
      };
      request('/api/bindBank',msg).then(res=>{
        window.console.log(res);
        if(res.code==200){
          Toast("添加成功");
          that.$router.push({path:'/mybankcard'});
        }else{
          Toast('添加失败')
        }
      })
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
