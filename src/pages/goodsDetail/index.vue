<template>
  <div class="goods-detail-wrap">
    <div class="banner">
      <i class="mint-toast-icon mintui mintui-back" @click="goBackLastPage"></i>
      
      <mt-swipe :auto="3000">
      <mt-swipe-item  v-for="(img,index) in detail.shop_img" :key="index">
        <img :src="img" alt/>
      </mt-swipe-item>
    </mt-swipe>
    </div>
    <p class="price">￥{{detail.fracture_price}}</p>
    <p class="title">{{detail.shop_sketch}}</p>
    <p class="number-inf clear">
      <i>库存{{detail.stock}}件</i>
      <b>销量{{detail.sold}}件</b>
    </p>
   <!-- <div class="buy-number clear">
      <i>购买数量</i>
      <div class="clear">
        <p @click="clickMinus">-</p>
        <input type="text" v-model="number" />
        <p @click="clickPlus">+</p>
      </div>
    </div> -->
    <div class="goods-detail-introduce">
      <p class="inf-title clear">
        <i></i>
        <b>宝贝详情</b>
        <i></i>
      </p>
      <img :src="imgg" alt  v-for="(imgg,indexx) in detail.shop_details" :key="indexx"/>
    </div>
    <p style="height:1rem"></p>
    <div class="buy-now clear">
      <router-link to="/index" class="to-home">
        <img src="../../assets/n1.png" alt />
        <p>首页</p>
      </router-link>
      <router-link to="/order" class="to-buy">立即购买</router-link>
    </div>
  </div>
</template>
<script>
import request from "../../request/request";
export default {
  components: {},
  name: "GoodsDetail",
  data() {
    return {
      number: 1,
      goodsid: "",
      detail:{},
			price:0
    };
  },
  mounted() {
    this.goodsid = this.$route.query.goodsId;
    let msg = {
      param: {
        shop_id: this.goodsid
      }
    };
    request("/api/shop_detail", msg).then(res => {
      window.console.log(res);
			var data=res.data.shop_data;
      this.detail=data;
			this.price=data.fracture_price;
			sessionStorage.setItem('goodsInfo',JSON.stringify(res.data));
			sessionStorage.setItem('goodsNum',1);
			sessionStorage.setItem('goodsTotalMoney',this.price)
			
    });
  },
  methods: {
    clickMinus() {
      if (this.number === 1) {
        return;
      }
      this.number--;
			sessionStorage.setItem('goodsNum',this.number)
			sessionStorage.setItem('goodsTotalMoney',this.price*this.number)
    },
    clickPlus() {
      this.number++;
			sessionStorage.setItem('goodsNum',this.number)
			sessionStorage.setItem('goodsTotalMoney',this.price*this.number)
    },
    goBackLastPage() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
@import "./index.css";
.goods-detail-wrap .banner i{
	z-index: 99999;
	}
</style>
