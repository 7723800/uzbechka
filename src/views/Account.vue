<template>
<div class="account">
  <div class="account__header">
    <div class="container">
      <div class="wrapper">
        <div class="backward">
          <svg @click="logOut" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <div class="title">Личный кабинет</div>
      </div>
    </div>
  </div>
  <transition-group name="fade-loader">
  <div :key="1" v-if="history.length" class="account__content">
  	<div class="container">
      <h4>История заказов</h4>
    <div v-for="historyItem in this.history" :key="historyItem.id" class="slidedown">
      <div class="slidedown-toggle">
        <div @click="showAccordion(historyItem.id, $event)" class="accordion">Заказ № {{historyItem.id}} от {{historyItem.date}}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
      </div>
      <div :ref="'order' + historyItem.id" class="menu__content">
        <div class="container">
        <div v-for="history in historyItem.items" class="product">
          <picture>
            <vue-load-image>
              <img slot="image" :src="history.url"/>
              <img slot="preloader" src="@/assets/images/preloader.jpg"/>
            </vue-load-image>
          </picture>
          <div class="product__content">
            <div class="product__description">
              <div class="product__name">{{history.name}}</div>
              <p>Количество: {{history.quantity}}шт</p>
              <p>Итого: {{history.total.toLocaleString('ru-RU')}}₸</p>
            </div>
          </div>
        </div>
        <p>Доставка: {{historyItem.delivery ? historyItem.delivery.toLocaleString('ru-RU') + '₸' : 'самовывоз'}}</p>
        <p class="total"><b>Сумма заказа: {{(historyItem.total + historyItem.delivery).toLocaleString('ru-RU')}}₸</b></p>
      </div>
      </div>
    </div>
    </div>
  </div>
  <div :key="2" v-else class="history-loader">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
  </transition-group>
</div>
</template>

<script>
import VueLoadImage from 'vue-load-image'
export default {
  name: 'account',
  components: {
    'vue-load-image': VueLoadImage
  },
  data() {
  	return {
      history: []
      }
  	},
  mounted() {
    this.getHistory(this.$route.params.id);
  },
  methods: {
    async getHistory(accout) {
      const url = `${this.server}/account/?history=${accout}`
      await (await fetch(url)).json().then(data => {
        this.history = data;
      })
    },
    showAccordion(id, e) {
      const panel = this.$refs['order' + id][0];
      const arrow =  e.target.nextElementSibling
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
        arrow.classList.remove('open');
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        arrow.classList.add('open');
      }  
    },
    logOut() {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    logIn() {
      return this.$store.state.logIn
    }
  },
  watch: {
    logIn() {
      this.history = []
      this.getHistory(this.logIn)
    }
  }
}
</script>

<style lang="scss">
.account {
  min-height: calc(100vh - 200px);
  background: $background;
  &__header {
    @include menuHeader;
    position: fixed;
    svg {
      transform: rotate(180deg);
    }
  }
  &__content {
    padding-top: $heightPixels;
    
    .container {
      padding: 0;
      h4 {
        padding: 0 15px;
        @include for-desktop-up {
          padding: 0;
        }
      }
    }
    .slidedown {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid $yellowColor;
      .menu__content {
        .title, .total {
            font-size: 105%;
          }
        .container {
          padding: 0 15px;
            @include for-desktop-up {
           padding: 0;
          }
        }
    p {
      margin: 0.5em 0;
      font-size: 100%;
    }
        padding-top: 0;
        max-height: 0;
        transition: 0.4s;
        overflow: hidden;
        .product__name {
          font-weight: bold;
        }
        .product__description {
          font-size: 100%;
        }
      }
      &-toggle {
        position: relative;
        display: flex;
        align-items: center;
        .open {
          transform: rotate(-90deg);
        }
        svg {
          position: absolute;
          width: 35px;
          height: 35px;
          right: 3%;
          fill: $yellowColor;
          transform: rotate(90deg);
          transition: 0.4s;
        }
      }
      .accordion {
        background: $mainGradient;
        color: #fff;
        cursor: pointer;
        padding: 10px;
        width: 100%;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.4s;
        font-size: 100%;
      }
    }
  }
  .history-loader {
    position: absolute;
    min-height: calc(100vh - 200px);
    width: 100%;
    display: flex;
    align-items: center;
    @include loader;
  }  
}
.fade-loader-enter-active {
  transition: opacity .5s
}
.fade-loader-enter {
  opacity: 0
}
</style>
