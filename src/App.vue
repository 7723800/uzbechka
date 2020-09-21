<template>
  <div id="app" class="app">
    <Header/>
    <div class="app-container">
      <transition name="router-anim" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/_header.vue'
import Footer from '@/components/_footer.vue'
import NProgress from 'nprogress'

export default {
  components: {
    Header,
    Footer,
    NProgress
  },
  data() {
    return {
      emptyMenu: {
        "item0": {
          "name": "Идет загрузка...",
          "order": 0,
          "url": `${this.server}/public/cloud.svg`,
          "items": [
            {
              "id": 1,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 2,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 3,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 4,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
          ]
        },
        "item1": {
          "name": "Идет загрузка...",
          "order": 1,
          "url": `${this.server}/public/cloud.svg`,
          "items": [
            {
              "id": 5,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 6,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 7,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 8,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
          ]
        },
        "item2": {
          "name": "Идет загрузка...",
          "order": 2,
          "url": `${this.server}/public/cloud.svg`,
          "items": [
            {
              "id": 9,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 10,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 11,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
            {
              "id": 12,
              "name": "Lorem ipsum",
              "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
              "price": 0,
              "launchbox": 0,
              "inCart": 0,
              "favorites": false,
              "url": `${this.server}/public/cloud.svg`
            },
          ]
        }
      }
    }
  },
  async beforeCreate() {
    await (await fetch(`${this.server}/menu/`)).json().then(data => {
      this.$store.commit('setMenu', data);
    })
    await this.$nextTick(() => {
      this.$store.commit('unpdateItemsProperty')
      this.deleteNotExisted();
    })
  },
  created() {
    if (!Object.keys(this.$store.state.menu).length) this.$store.commit('setMenu', this.emptyMenu);
    NProgress.start();
  },
  mounted() {
    NProgress.done();
  },
  methods: {
    deleteNotExisted() {
      const findInMenu = product => {
        for (const menu of Object.keys(this.$store.state.menu)) {
          const isExist = this.$store.state.menu[menu].items.find(item => item.id === product.id)
          if (isExist) return true
        }
      }
      for (const product of this.$store.state.inBasket) {
        if (!findInMenu(product)) this.$store.commit('removeFromBasket', product.id)
      }
      for (const product of this.$store.state.inFavorites) {
        if (!findInMenu(product)) this.$store.commit('removeFromFav', product.id)
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: Uzbechka;
  src: url('assets/fonts/font.woff2');
}
@font-face {
  font-family: UzbechkaThin;
  src: url('assets/fonts/Uzbechka.woff');
 }
body {
  margin: 0 !important;
  background: #F8F8F8;
  scroll-behavior: smooth;
}
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: inherit;
  outline: none;
}
p {
  font-family: UzbechkaThin
}
input, button, textarea {
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  -webkit-appearance: none;
}
img {
  width: 100%;
}
.app {
  font-family: Uzbechka,Helvetica,Arial,sans-serif;
  &-container {
    margin-top: 50px;
     @include for-desktop-up {
     margin-top: 90px;
    }
  }
}
.container {
  padding:0 15px;
  margin: 0 auto 0;
  @include for-desktop-up {
    width: 1200px !important;
  }
}
.about, .gallery, .chef, .order, .vacancy, .contacts, .offer {
  padding: 5px 0;
}
.backward {
  cursor: pointer;
}
.router-anim-enter-active, .router-anim-leave-active {
  transition: opacity .3s;
}
 .router-anim-enter, .router-anim-leave-to {
  opacity: 0;
}
.toggle-scaled-enter-active {
  animation: scaleInOut .2s;
}
.toggle-scaled-leave-to {
  animation: scaleInOut .2s reverse;
}
@keyframes scaleInOut {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
#nprogress {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
  .bar {
    background: $yellowColor!important;
    height: 3px;
  }
}
</style>
