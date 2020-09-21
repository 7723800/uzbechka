import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import Checkout from './views/Checkout.vue'
import Order from './views/Order.vue'
import Account from './views/Account.vue'
import About from './views/About.vue'
import Chef from './views/Chef.vue'
import Gallery from './views/Gallery.vue'
import Vacancy from './views/Vacancy.vue'
import Contacts from './views/Contacts.vue'
import Offer from './views/Offer.vue'
import Administrator from './views/Administrator.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/account/:id',
      name: 'account',
      component: Account
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/chef',
      name: 'chef',
      component: Chef
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/vacancy',
      name: 'vacancy',
      component: Vacancy
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/offer',
      name: 'offer',
      component: Offer
    },
    {
      path: '/administrator/:id',
      name: 'administrator',
      component: Administrator
    },
    { 
      path: '/404',
      name: 'notfound',
      component: NotFound},
    { 
      path: '*', 
      redirect:'/404'
  }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300)
    })
  }
})
