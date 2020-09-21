<template>
<div class="vacancy">
	<div class="container">
    <h3>Наши вакансии</h3>
    <img src="@/assets/images/team.jpg">
    <p>Ресторан «Наша Узбечка» ищет «Лучших людей для Лучшего ресторана» и открывает возможности для амбициозных, заинтересованных и перспективных кадров!</p>
    <p>Находясь в непрерывном динамичном развитии, мы с лёгкостью достигаем поставленных целей и вместе раскрываем потенциал каждого, кто стремится стать профессионалом своего дела и готов расширяться вместе с нами.</p>
    <h4>Расскажи нам о себе</h4>
    <div class="form">
      <div class="form__row">
        <div class="form__col-name">
          <label>Имя</label>
          <input ref="name" name="name" type="text">
        </div>
        <div class="form__col-phone">
          <label>Номер телефона</label>
          <input :value="phone" ref="phone" :class="{ incorrect: !isCorrectPhone }" name="phone" class="value" v-imask="mask" @accept="onAccept" @complete="onComplete" type="tel">
        </div>
      </div>
      <div class="form__row">
        <div class="form__col-info">
          <label>Информация</label>
          <textarea ref="about" name="info" class="value"></textarea>
        </div>
      </div>
      <div class="form__row msg">
        <transition name="fade">
          <div v-if="msg" class="info"><span>Ваша заявка принята</span></div>
        </transition>
      </div>
      <div class="form__row-action">
        <button @click="sendSummary" class="btn">Отправить заявку</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {IMaskDirective} from 'vue-imask';
export default {
  name: 'vacancy',
  data() {
    return {
      isCorrectPhone: true,
      ajaxSend: true,
      msg: false,
      phone: '',
      mask: {
        mask: '{+7} (000) 000-00-00',
        lazy: false,
        placeholderChar: '•'
      }
    }
  },
  directives: {
    imask: IMaskDirective
  },
  methods: {
    onAccept (e) {
      const maskRef = e.detail;
      maskRef.unmaskedValue.length <= 3 ? this.isCorrectPhone = true : this.isCorrectPhone = false
    },
    onComplete () {
      this.isCorrectPhone = true
    },
    async sendSummary() {
      const phone = this.$refs.phone
      const isPhone = /•/.test(phone.value);
      if (!isPhone && this.ajaxSend) {
          this.ajaxSend = false;
           await (await fetch(`${this.server}/vacancy/`, {
            method:'post',
            body: JSON.stringify({name: this.$refs.name.value, phone: phone.value, about: this.$refs.about.value})
           })).json().then(data => {
             if (data) {
              IMaskDirective.unbind(phone);
              this.$refs.about.value = '';
              this.$refs.name.value = '';
              this.msg = true;
              setTimeout(() => { this.msg = false; this.ajaxSend = true; }, 3000)
            }
           })
      } else this.isCorrectPhone = false
    }
  },
}
</script>

<style lang="scss">
.vacancy {
  p {
    text-indent: 1.5em;
    text-align: justify;
  }
  .form {
    @include form(5px 0);
    &__row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      @include incorrect;
      &-action {
        text-align: center;
        .btn {
          @include btn;
        }
      }
      .info {
        width: 100%;
        color: $yellowColor;
      }
    }
    .msg {
      text-align: center;
      height: 20px;
    }
    &__col {
      &-name {
        width: 39%;
      }
      &-phone {
        width: 57%;
      }
      &-info {
        width: 100%;
      }
    }
   
  }
   @include for-desktop-up {
    min-height: calc(100vh - 204px);
    img {
      width: 45%;
      float: right;
      margin-left: 20px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
