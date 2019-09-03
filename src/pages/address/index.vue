<template>
  <div class="change-address-wrap">
    <mt-header :title="title">
      <i slot="left" @click="goBackLastPage">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <mt-field label="收货人" placeholder="请输入收货人" v-model="name"></mt-field>
    <mt-field label="联系方式" placeholder="请输入联系方式" v-model="phone"></mt-field>
    <mt-field
      label="省市区"
      placeholder="请选择省市区"
      v-model="area"
      @click.native="pickAgentArea"
      readonly
    ></mt-field>
    <mt-field label="详细地址" placeholder="请输入地址" v-model="address"></mt-field>
    <p class="switch clear">
      <span>设为默认地址</span>
      <mt-switch v-model="value"></mt-switch>
    </p>
    <p class="switch delete" v-if="isch=='0'">
      <span @click="deleteAddress">删除收货地址</span>
    </p>
    <div class="submit-btn">
      <mt-button type="danger" size="large" @click="sure()">完成</mt-button>
    </div>
    <div v-if="pickSign">
      <agent-area v-on:pickArea="pickArea"></agent-area>
    </div>
  </div>
</template>
<script>
import AgentArea from "../../components/AgentArea";
import request from "../../request/request";
import { MessageBox, Toast } from "mint-ui";
export default {
  components: { AgentArea },
  name: "Address",
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      value: true,
      title: "",
      isch: "",
      id: "",
      area: "",
      pickSign: false,
      addrr: ""
    };
  },
  mounted() {
    this.isch = this.$route.query.isc;
    var queryListData = this.$route.query.listData;
    console.log(this.$route.query.listData);
    
    if (this.$route.query.isc == 0) {
      this.id = queryListData.id || "";
      this.title = "编辑收货地址";
      console.log(queryListData.name);
      this.name = queryListData.name;
      this.phone = queryListData.phone;
      this.area = queryListData.province+queryListData.city+queryListData.area;
      this.address = queryListData.detailed;
      this.value = queryListData.is_lev==1?true:false;
    } else {
      this.title = "添加收货地址";
    }
  },
  methods: {
    goBackLastPage() {
      this.$router.back(-1);
    },
    pickAgentArea() {
      this.pickSign = true;
    },
    pickArea(data) {
      this.addrr = JSON.parse(data);
      this.pickSign = false;
      if (data) {
        this.area = this.addrr.province + this.addrr.city + this.addrr.area;
      } else {
        this.area = "";
      }
    },
    deleteAddress() {
      let that = this;
      MessageBox({
        title: "提示",
        message: "确定要删除该地址吗?",
        showCancelButton: true
      })
        .then(result => {
          if (result === "confirm") {
            // console.log("确认删除");
            let msg = {
              param: {
                id: that.id
              }
            };
            console.log(msg)
            request("/api/addres/deleted", msg).then(res => {
              console.log(res)
              if (res.code == 200) {
                Toast("删除成功");
                that.goBackLastPage()
              } else {
                Toast("删除失败");
              }
            });
          } else {
            // console.log("点击的取消按钮");
          }
        })
        .catch(err => {});
    },
    sure() {
      var that = this;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      console.log(this.address)
      if (this.name == "" || this.phone == "" || this.address == "") {
        Toast("请填写详细内容");
        return;
      } else if (!reg.test(this.phone)) {
        Toast("请填写正确的手机号");
        return;
      }
      let nor;
      if (this.value == true) {
        nor = 1;
      } else {
        nor = 0;
      }

      if (this.addrr.city == "市辖区") {
        this.addrr.city =this.addrr.province ;
      }
      if (this.isch == 0) {
        //编辑
        let msg = {
          param: {
            name: this.name,
            phone: this.phone,
            detailed: this.address,
            is_lev: this.value?1:0,
            id: this.id,
            province: this.addrr.province,
            city: this.addrr.city,
            area: this.addrr.area
          },
          method: "post"
        };
        
        request("/api/addres/updated", msg).then(res => {
          console.log(msg)
          console.log(res)
          if (res.code == 200) {
            Toast("修改成功");
            that.$router.push({ path: "/myaddress" });
          } else {
            Toast("修改失败");
          }
        });
      } else {
        let msg = {
          param: {
            name: this.name,
            phone: this.phone,
            detailed: this.address,
            is_lev: this.value?1:0,
            province: this.addrr.province,
            city: this.addrr.city,
            area: this.addrr.area
          },
          method: "POST"
        };
        request("/api/addres", msg).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            Toast("添加成功");
            that.$router.push({ path: "/myaddress" });
          } else {
            Toast("添加失败");
          }
        });
      }
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
