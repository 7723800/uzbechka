<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
        <img v-if="screenWidth < screenXL" @click="hamburger = false" class="logo" src="@/assets/images/logo.svg">
        <img v-else class="logo" src="@/assets/images/logoXL.svg" >
      </router-link>
      <div class="location">
        <div class="location__wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        <span>Nur-Sultan</span></div>
        <div v-if="screenWidth > screenXL" class="local-phone">+7 701 047 88 88</div>
      </div>
      <div v-if="screenWidth < screenXL" @click="toggleHmbrMenu" class="hamburger">
        <transition name="toggle-scaled" mode="out-in">
          <svg key=1 v-if="hamburger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          <svg key=2 v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </transition>
      </div>
      <div v-else class="header__links-xl">
        <div class="hamburger-menu__login">
          <!-- <label for="login">Личный кабинет</label> -->
          <div class="login-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            <input ref="loginXL" type="tel" :value="phoneLogin" name="phone" v-imask="maskLogin" :class="{ incorrect: !isCorrectPhone }" @accept="onAccept" @complete="onComplete">
            <button @click="logIn">Войти</button>
            <div v-if="loader" class="lds-dual-ring"></div>
          </div>
          <div v-show="noLogin" class="info"><span>По данному номеру нет заказов</span></div>
        </div>
        <nav>
          <ul>
            <li class="links">
              <router-link :to="{name: 'home'}">Главная</router-link>
            </li>
            <li class="links">
              <router-link :to="{name: 'menu'}">Наше меню</router-link>
            </li>
            <li class="links">
              <router-link :to="{name: 'about'}">Наш ресторан</router-link>
            </li>
            <li class="links">
              <router-link :to="{name: 'contacts'}">Наши контакты</router-link>
            </li>
             <li @click="dropdownMenu = !dropdownMenu" class="links dropdown">
                <a>Ещё</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
            </li>
          </ul>
          <transition name="menu-hamburger">
          <div v-if="dropdownMenu" class="dropdown-menu">
            <ul>
              <li class="links">
                <router-link :to="{name: 'chef'}">Наш шеф-повар</router-link>
              </li>
              <li class="links">
                <router-link :to="{name: 'gallery'}">Наши фотоотчеты</router-link>
              </li>
              <li class="links">
                <router-link :to="{name: 'vacancy'}">Наши вакансии</router-link>
              </li>
              <li class="links">
                <router-link :to="{name: 'offer'}">Ваши пожелания</router-link>
              </li>
            </ul>
          </div>
        </transition>
        </nav>
      </div>
    </div>
    <!-- main menu -->
    <transition name="menu-hamburger">
    <div v-show="hamburger" class="hamburger-menu">
      <div class="container">
         <div class="hamburger-menu__login">
          <label for="login">Личный кабинет</label>
          <div class="login-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            <input ref="login" type="tel" :value="phoneLogin" name="phone" v-imask="maskLogin" :class="{ incorrect: !isCorrectPhone }" @accept="onAccept" @complete="onComplete">
            <button @click="logIn">Войти</button>
            <div v-if="loader" class="lds-dual-ring"></div>
          </div>
          <div v-show="noLogin" class="info"><span>По данному номеру нет заказов</span></div>
        </div>
        <div class="hamburger-menu__links">
          <ul>
            <li>
              <router-link :to="{name: 'home'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                <p>Главная</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'menu'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>
                <p>Наше меню</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'about'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                <p>Наш ресторан</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'chef'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M2 17h20v2H2zm11.84-9.21c.1-.24.16-.51.16-.79 0-1.1-.9-2-2-2s-2 .9-2 2c0 .28.06.55.16.79C6.25 8.6 3.27 11.93 3 16h18c-.27-4.07-3.25-7.4-7.16-8.21z"/></svg>
                <p>Наш шеф-повар</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'gallery'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>
                <p>Наши фотоотчеты</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'vacancy'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z"/></svg>
                <p>Наши вакансии</p>
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'offer'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0zm15.35 6.41l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l6.88-6.88c.2-.19.2-.51 0-.71z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z"/></svg>
                <p>Ваши пожелания</p>
              </router-link> 
            </li>
            <li>
              <router-link :to="{name: 'contacts'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                <p>Наши контакты</p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="hamburger-menu__horeca-logo">
          <img src="@/assets/images/logo-horeca.png">
        </div>
      </div>
    </div>
  </transition>
  </header>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import {IMaskDirective} from 'vue-imask';

export default {
  name: 'Header',
  data() {
    return {
      hamburger: false,
      delay: 400,
      isLogin: false,
      loader: false,
      noLogin: false,
      adminPhone: '78881018888',
      path: 'account',
      phone: '',
      phoneLogin: '+7 (•••) •••-••-••',
      maskLogin: {
        mask: '{+7} (000) 000-00-00',
        lazy: false,
        placeholderChar: '•'
      },
      isCorrectPhone: true,
      dropdownMenu: false
    }
  },
  directives: {
    imask: IMaskDirective
  },
  mounted() {
    if ((this.$router.currentRoute.name === 'account' || this.$router.currentRoute.name === 'administrator') && !this.isLogin) this.$router.push({ name: 'home' })
    this.navClick()
  },
  methods: {
    toggleHmbrMenu() {
      const toggleFunc = toggleNav => {
        this.$store.commit(toggleNav)
        setTimeout(() => { this.hamburger = !this.hamburger }, this.delay)
      }
      switch (true) {
        case this.$store.state.cart: toggleFunc('toggleCart')
          break;
        case this.$store.state.favorites: toggleFunc('toggleFav')
          break;
        case this.$store.state.search: toggleFunc('toggleSearch')
          break;
        default: this.hamburger = !this.hamburger
      }
    },
    onAccept (e) {
        const maskRef = e.detail;
        maskRef.unmaskedValue.length <= 3 ? this.isCorrectPhone = true : this.isCorrectPhone = false;
        this.phone = '';
        this.noLogin = false
    },
    onComplete (e) {
        const maskRef = e.detail;
        this.isCorrectPhone = true
        this.phone =  maskRef.unmaskedValue.replace(/[+]/gi,'')
    },
    async logIn() {
      if (this.phone.length) {
        this.phone === this.adminPhone ?  this.path = 'administrator' :  this.path = 'account'
        if (this.$route.name === this.path) history.replaceState(null, null, this.phone);
        this.loader = !this.loader;
        const url = `${this.server}/${this.path}/?login=${this.phone}`
        await (await fetch(url)).json().then(data => {
          this.loader = !this.loader;
          if (data) {
            clearAllBodyScrollLocks()
            this.noLogin = false
            this.hamburger = false
            this.$store.commit('logIn', this.phone)
            setTimeout(() => {
              this.$router.push({ path: `/${this.path}/${this.phone}` }) 
              this.$nextTick(() => this.isLogin = true)
            }, this.delay)
          } else this.noLogin = true
        })
      } else this.isCorrectPhone = false
    },
    navClick() {
      const navs = document.querySelectorAll('.hamburger-menu__links > ul > li')
      for (const nav of navs) {
        nav.addEventListener('click', (e) => {
          this.hamburger = false
        });
      }
    }
  },
  watch: {
    hamburger() {
      const menu = document.querySelector('.hamburger-menu .container')
      this.hamburger ? disableBodyScroll(menu) : enableBodyScroll(menu)
    },
    '$route' (to, from) {
      if ((from.name === 'account' || from.name === 'administrator') && to.name === 'home') {
        IMaskDirective.unbind(this.$refs.login)
        if (this.screenWidth > this.screenXL) {
          IMaskDirective.unbind(this.$refs.loginXL)
          this.$refs.loginXL.value = '+7 (•••) •••-••-••';
        }
        this.phone = '';
      }
      if (this.dropdownMenu) this.dropdownMenu = false;
    }
  }
}
</script>

<style lang="scss">
$buttonWidth: 30%;
.header {
  position: fixed;
  width: 100vw;
  height: $headerHeight;
  left: 0;
  top: 0;
  background: $mainGradient;
  border-bottom: 1px solid $yellowColor;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 103;
  box-shadow: $boxShadow;
  @include for-desktop-up {
    height: $headerHeightXL;
  }
  &__links-xl {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    nav {
      margin-bottom: 5px;
    }
    .links {
      float: left;
      color: $yellowColor;
      margin: 0 35px;
      a {
        position: relative;
        display: inline-table;
        &::before {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          width: 0;
          margin: auto;
          background: $yellowColor;
          transition: width .4s;
        }
        &:hover::before {
          width: 100%;
        }
      }
      .router-link-exact-active {
        &::before {
          width: 100%;
        }
      }
    }
    .dropdown {
      display: flex;
      cursor: pointer;
      svg {
        width: 20px;
        fill: $yellowColor;
        transform: rotate(90deg);
        margin-left: 5px;
      }
      &-menu {
        position: absolute;
        width: 210px;
        right: 0;
        top: 100px;
        background: $mainGradient;
        box-shadow: $boxShadow;
        border-radius: $borderRadius;
        padding: 10px 0;
        &::before {
          content: "";
          position: absolute;
          top: auto;
          bottom: 100%;
          right: 30%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent $purpleСolour transparent;
        }
        .links {
          margin-top: 15px;
          margin-bottom: 15px;
        }
      }
    }
  }
  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .logo {
    width: 25vw;
     @include for-desktop-up {
      width: 90px;
     }
  }
  .location {
    display: flex;
    align-items: center;
    flex-direction: column;
     @include for-desktop-up {
      svg {
        width: 22px;
      }
    }
    svg {
      fill:#fff;
      width: 18px;
      @include for-desktop-up {
        width: 26px;
      }
    }
    span {
      color:#fff;
      margin-left: 5px;
      font-size: 90%;
       @include for-desktop-up {
        font-size: 110%;
       }
    }
    &__wrapper {
      display: flex;
      align-items: center;
    }
    .local-phone {
      color: #fff;
      margin-top: 16px;
      font-size: 120%
    }
  }
  .hamburger {
    svg {
      fill: $yellowColor;
      width: 35px;
      height: 35px;
    }
    &-menu {
      display: flex;
      position: fixed;
      background: #3D244F;
      top: $headerHeight;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px 0;
      z-index: 101;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('../assets/images/patterns.svg') center center / cover no-repeat;
        opacity: .025;
      }
      li {
        color: #fff;
      }
      .container {
        flex-wrap: wrap;
        height: 100%;
        align-items: flex-start;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
      }
        &__login {
        width: 100%;
        position: relative;
        text-align: center;
        min-height: 95px;
        label {
          color: #fff;
        }
        @include for-desktop-up {
          min-height: auto;
          width: 40%;
          align-self: flex-end;
        }
        .login-wrap {
          position: relative;
          margin: 10px 0;
          input {
            width: calc(100% - #{$buttonWidth});
            padding: 8px 8px 8px 40px;
            border: 1px solid $yellowColor;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0; 
            color: #fff;
            font-size: 16px;
            transition: all .5s ease;
          }
          button {
            padding: 8px 0;
            border: 1px solid $yellowColor;
            width: $buttonWidth;
            color: $yellowColor;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;  
            border-left-style: none;
            font-size: 16px;
            transition: all .5s ease;
            cursor: pointer;
            &:hover {
              background: $yellowColor;
              color: $purpleСolour;
            }
          }
          svg {
            position: absolute;
            top: 8px;
            left: 10px;
            fill: $yellowColor;
          }
          .lds-dual-ring::after {
            content: "";
            position: absolute;
            display: block;
            top: 10px;
            right: 32%;
            width: 15px;
            height: 15px;
            margin: 1px;
            border-radius: 50%;
            border: 3px solid $yellowColor;
            border-color: $yellowColor transparent $yellowColor transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }
          @include for-desktop-up {
            margin: 5px 0 0;
          }
        }
        .info {
          font-size: 90%;
          color: #fff;
          span {
            color:red;
          }
        }
        @include incorrect;
      }
      &__horeca-logo {
        width: 100%;
        text-align: center;
        align-self: flex-end;
        img {
          width: 30vw
        }
      }
      &__links {
        width: 100%;
        z-index: 1;
        padding: 0 8px;
          svg {
          float: left;
          width: 25px;
          height: 25px;
          margin: -2px 25px 0 0px;
          fill: $yellowColor; 
        }
        p {
          font-size: 105%
        }
      }
    }
  }
}
.menu-hamburger-enter-active, .menu-hamburger-leave-active {
  transition: all .5s ease;
}
.menu-hamburger-enter, .menu-hamburger-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
.menu-login-enter-active, .menu-login-leave-active {
  transition: all .5s ease;
}
.menu-login-enter, .menu-login-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
