<template>
  <div class="share-detail-wrap">
    <div class="share-list-wrap">
      <ul class="clear">
        <li>
          <div style="background:#21B11F;" v-bind="shareWF">
            <img src="../../assets/wechat.png" alt />
          </div>
          <p>微信好友</p>
        </li>
        <li>
          <div style="background:#1BABF9;">
            <img src="../../assets/qq.png" alt />
          </div>
          <p>QQ好友</p>
        </li>
        <li>
          <div style="background:#98CF2B;" v-bind="shareWP">
            <img src="../../assets/wechat-friend.png" alt />
          </div>
          <p>朋友圈</p>
        </li>
        <li>
          <div style="background:#FDBF15;">
            <img src="../../assets/qzone.png" alt />
          </div>
          <p>QQ空间</p>
        </li>
      </ul>
      <p class="cancle-btn" @click="cancleShareBtn">取消</p>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  components: {},
  name: "ShareDetail",
  data() {
    return {
      shareUrl: ''
    };
  },
  mounted() {},
  methods: {
    cancleShareBtn() {
       this.$emit('cancleShare',false)
    },
    shareWF(){
      let _this = this
        this.API.get('/uc/wx_params'+'?channel=h5'+'&url='+window.location.href).then(function(res){
            if(res.code==200){
              var Data = res.data;
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
              wx.config({
                debug: false, // 开启调试模式,开发时可以开启 
                appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
                timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
                nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
                signature: Data.signature,   // 必填，签名 由接口返回
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法
              });
            }else if(res.code==50107){
              $.toptip('用户不存在', 'warning');
            }else if(res.code == 40002){
              $.toptip('参数缺失', 'warning');
            }else if(res.code == 500){
              $.toptip('系统异常，请稍后再试', 'warning');
            }else{
              $.toptip('系统繁忙，请稍后再试', 'warning');
            }
        }).catch(function(error){
            console.log('wx_params', error);
        });
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({ 
              title: '', // 分享标题
              desc: '', // 分享描述
              link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
                // 设置成功
              }
          })
      });
    },
    shareWP(){},
    wxShare() {
        let _this = this
        this.API.get('/uc/wx_params'+'?channel=h5'+'&url='+window.location.href).then(function(res){
            if(res.code==200){
              var Data = res.data;
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
              wx.config({
                debug: false, // 开启调试模式,开发时可以开启 
                appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
                timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
                nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
                signature: Data.signature,   // 必填，签名 由接口返回
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法
              });
            }else if(res.code==50107){
              $.toptip('用户不存在', 'warning');
            }else if(res.code == 40002){
              $.toptip('参数缺失', 'warning');
            }else if(res.code == 500){
              $.toptip('系统异常，请稍后再试', 'warning');
            }else{
              $.toptip('系统繁忙，请稍后再试', 'warning');
            }
        }).catch(function(error){
            console.log('wx_params', error);
        });
        wx.ready(() => {
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: '酒利多', // 分享标题
            desc: '买的多赚得多！', // 分享描述
            link: _this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: window.document.location.protocol + '//' + window.document.location.host + '/kwd/static/img/logo.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              _this.$router.push({path:'/me',query:{}})
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              // alert('cancel')
              _this.fetchData()
            }
          })
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: '酒利多', // 分享标题
            link: _this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: window.document.location.protocol + '//' + window.document.location.host + '/kwd/static/img/logo.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              _this.$router.push({path:'/me',query:{}})
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              _this.fetchData()
            }
          })
        })
      }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
