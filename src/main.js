import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixins from './mixins.js'
import VueSnip from 'vue-snip'
import '@/sass/_index.scss';

Vue.config.productionTip = false
Vue.mixin(mixins)
Vue.use(VueSnip)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')




