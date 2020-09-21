import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'

Vue.config.productionTip = false

// Vue.prototype.server = 'https://data.nashabechka.kz';
Vue.prototype.server = 'http://192.168.0.34';
Vue.prototype.screenXL = 1200;
Vue.prototype.screenWidth = screen.width;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('./assets/images/marker.png'),
   iconUrl: require('./assets/images/marker.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  	NProgress.start()
  	next()
})
router.afterEach((to, from) => {
    NProgress.done()
})
NProgress.configure({ showSpinner: false, ease: 'ease-out', speed: 500});