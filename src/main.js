// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import router from './router'
import store from './vuex/store'
import 'bootstrap/dist/css/bootstrap.css';
import 'dropzone/dist/min/dropzone.min.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach(function(to, from, next) {
  localStorage.setItem('token', '1234556')
  let login = store.getters.checkLogined;
  if (to.meta.requiresAuth) {
    if (login) {
      if (to.name == 'login') {
        return next({path: '/login'});
      }
      next();
    } else {
      if (to.name != 'login') {
        return next({path: '/login'});
      }
      next();
    }
  } else {
    if (login) {
      if (to.name == 'login') {
        return next({path: '/'});
      }
    }
    next();
  }
});



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

