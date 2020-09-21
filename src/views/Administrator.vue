<template>
<div class="admin">
  <div class="admin__header">
     <div class="container">
      <div class="wrapper">
        <div class="backward">
          <svg @click="logOut" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <div class="title">Администратор</div>
      </div>
    </div>
  </div>
  <transition-group name="fade-loader">
  <div :key="1" v-if="history.length" class="admin__content">
  	<div class="container">
      <h4>Пожелания</h4>
      <div v-for="historyItem in this.history" class="offer-container">{{historyItem}}</div>
    </div>
  </div>
  <div :key="2" v-else class="history-loader">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
  </transition-group>
</div>
</template>

<script>
export default {
  name: 'account',
  data() {
  	return {
      history: [],
      }
  	},
  mounted() {
    this.getHistory(this.$route.params.id);
  },
  methods: {
    async getHistory(accout) {
      const url = `${this.server}/administrator/?history=${accout}`
      await (await fetch(url)).json().then(data => {
        this.history = data;
      })
    },
    logOut() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">
.admin {
  min-height: calc(100vh - 204px);
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
    .offer-container {
      margin: 10px 0;
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
