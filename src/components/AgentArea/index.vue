// 三级联动组件
<template>
  <div class="agent-area-wrap">
    <div class="area">
      <p class="area-title">地区选择</p>
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      <div class="pick-oper clear">
        <button @click="clickCanclePickBtn">取消</button>
        <button @click="clickPickBtn">确定</button>
      </div>
      <!-- <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p> -->
    </div>
  </div>
</template>
<script>
import { Picker } from "mint-ui";
import myaddress from "../../assets/pca.json";
export default {
  name: "AgentArea",
  data() {
    return {
      isShowAddress: false,
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "",
      myAddressCity: "",
      myAddresscounty: ""
    };
  },
  methods: {
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); 
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    clickPickBtn() {
      this.$emit(
        "pickArea",
        JSON.stringify({
          province:this.myAddressProvince,
          city:this.myAddressCity,
          area:this.myAddresscounty
        })
      );
    },
    clickCanclePickBtn() {
      this.$emit("pickArea", "");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.myAddressSlots[0].defaultIndex = 0;
    });
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
