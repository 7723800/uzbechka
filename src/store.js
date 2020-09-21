import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: {},
  	cart: false,
    favorites: false,
    search: false,
  	inBasket: [],
    inFavorites: [],
    logIn:'',
    marginFooter: true
  },
  plugins: [createPersistedState({
        paths: ['menu', 'inBasket', 'inFavorites', 'logIn', 'marginFooter'],
     })],
  mutations: {
    setMenu(state, newMenu) {
      state.menu = newMenu
    },
  	toggleCart(state) {
      state.cart = !state.cart
    },
    logIn(state, id) {
      state.logIn = id
    },
    toggleFav(state) {
      state.favorites = !state.favorites
    },
    toggleSearch(state) {
      state.search = !state.search
    },
    pushToBasket(state, item) {
      item.inCart = 1;
    	state.inBasket.push(item);
    },
    pushToFav(state, goods) {
      const isInFav = state.inBasket.find(item => item.id === goods.id);
      state.inFavorites.push(goods);
      if (isInFav) Object.assign(isInFav, goods)
    },
    removeFromBasket(state, id) {
    	const goodsIndex = state.inBasket.map(item => item.id).indexOf(id);
      state.inBasket.splice(goodsIndex, 1);
    },
    plusOneItem(state, goods) {
      goods.inCart ++
    	const product = state.inBasket.find(item => item.id === goods.id);
      Object.assign(product, goods)
    },
    minusOneItem(state, goods) {
      goods.inCart --
      const product = state.inBasket.find(item => item.id === goods.id);
      Object.assign(product, goods)
    },
    removeFromFav(state, id) {
      const goodsIndex = state.inFavorites.map(item => item.id).indexOf(id);
      const isInFav = state.inBasket.find(item => item.id === id);
      state.inFavorites.splice(goodsIndex, 1);
      if (isInFav) isInFav.favorites = false;
    },
    unpdateItem(state, goods) {
      const inBasket = state.inBasket.find(item => item.id === goods.id);
      const inFavorites = state.inFavorites.find(item => item.id === goods.id);
      if (inBasket) Object.assign(inBasket, goods)
      if (inFavorites) Object.assign(inFavorites, goods)
    },
    unpdateItemsProperty(state) {
      for (const menu of Object.keys(state.menu)) {
        state.menu[menu].items.forEach(product => {
            const itemInCart = state.inBasket.find(item => item.id === product.id);
            const itemInFav = state.inFavorites.find(item => item.id === product.id);
            if (itemInCart) {
              product.inCart = itemInCart.inCart
              itemInCart.name = product.name
              itemInCart.price = product.price
              itemInCart.url = product.url
              itemInCart.launchbox = product.launchbox
              if (itemInCart.extraPrice) {
                itemInCart.extraPrice.mini = product.extraPrice.mini
                itemInCart.extraPrice.default = product.extraPrice.default
                if (itemInCart.extraPrice.isMini) {
                  product.price = itemInCart.extraPrice.mini
                  product.extraPrice.isMini = true
                }
              }
            }  else product.inCart = 0
            if (itemInFav) {
              product.favorites = itemInFav.favorites
              itemInFav.inCart = product.inCart 
              itemInFav.name = product.name
              itemInFav.price = product.price
              itemInFav.url = product.url
              itemInFav.launchbox = product.launchbox
              if (itemInFav.extraPrice) {
                itemInFav.extraPrice.mini = product.extraPrice.mini
                itemInFav.extraPrice.default = product.extraPrice.default
                if (itemInFav.extraPrice.isMini) {
                  product.price = itemInFav.extraPrice.mini
                  product.extraPrice.isMini = true
                }
              }
            } else product.favorites = false
        })
      }
    },
    clearBasket(state) {
      state.inBasket = []
    }
  },
  actions: {
    pushToBasket(context, goods) {
    context.commit('pushToBasket', goods);
    },
  	plusOneItem(context, goods) {
    context.commit('plusOneItem', goods);
    },
    minusOneItem(context, goods) {
    context.commit('minusOneItem', goods);
    },
    setMenu(context, newMenu) {
      context.commit('setMenu', newMenu);
    },
    unpdateItemsProperty(context) {
      context.commit('unpdateItemsProperty');
    },
  }
})
