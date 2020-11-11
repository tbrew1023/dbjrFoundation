import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'
import firebase from 'firebase'
import { firebaseConfig } from '../firebase-config.js'

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(VueFullPage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
