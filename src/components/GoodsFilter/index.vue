<template>
  <div class="goods-filter-wrap">
    <ul class="goods-filter clear">
      <li :class="{'active':activeKey==='0'}" @click="clickFilterBtn('0')">默认</li>
      <li :class="{'active':activeKey==='1'}" @click="clickFilterBtn('1')">
        销量
        <i></i>
      </li>
      <li :class="{'active':activeKey==='2'}" @click="clickFilterBtn('0')">上新</li>
      <li :class="{'active':activeKey==='3'}" @click="clickFilterBtn('3')">
        价格
        <i></i>
      </li>
    </ul>
    <ul class="price-list" v-if="showPriceListSign">
      <li @click="changePrice('0')">99</li>
      <li @click="changePrice('1')">198</li>
      <li @click="changePrice('2')">396</li>
      <!-- <li @click="changePrice('3')">500以上</li> -->
    </ul>
  </div>
</template>
<script>
import VueEvent from '../../store/modules/vueEvent.js';
export default {
  components: {},
  name: "GoodsFilter",
  data() {
    return {
      showPriceListSign: false,
      activeKey: "0"
    };
  },
  mounted() {
    this.clickFilterBtn("0");
  },
  methods: {
    clickFilterBtn(type) {
      this.activeKey = type;
      if (type === "3") {
        this.showPriceListSign = !this.showPriceListSign;
      } else {
        if (this.showPriceListSign) {
          this.showPriceListSign = false;
        }
        this.goodsClass(type);
      }
    },
    changePrice(type) {
      this.showPriceListSign = false;
      this.goodsClass('p'+type);
    },
    goodsClass(index) {
      VueEvent.$emit('goodsClass', index);
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
