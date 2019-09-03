import Vue from 'vue'
import App from './layouts/base'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import routes from './routes/routes'
import './service/global'
Vue.use(MintUI)
Vue.config.productionTip = false

new Vue({
  store,
  router:routes,
  render: h => h(App),
}).$mount('#app')
