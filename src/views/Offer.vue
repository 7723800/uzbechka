<template>
<div class="offer">
	<div class="container">
    <h3>Ваши пожелания</h3>
    <img src="@/assets/images/offer.jpg">
    <p>Мы рады учитывать Ваши пежелания и рекомендации, для того, что бы Вы, всегда чувствовали себя комфортно в ресторане "Наша Узбечка"</p>
    <div class="form">
      <div class="form__row">
        <div class="form__col-info">
          <label>Пожелание</label>
          <textarea @focus="isValue = true" ref="offer" :class="{ incorrect: !isValue }" name="info" ></textarea>
        </div>
      </div>
      <div class="form__row msg">
        <transition name="fade">
          <div v-if="msg" class="info"><span>Ваше сообщение принято. Спасибо!</span></div>
        </transition>
      </div>
      <div class="form__row-action">
        <button @click="sendOffer" class="btn">Отправить пожелание</button>
      </div>
    </div>
	</div>
</div>
</template>

<script>
export default {
  name: 'offer',
  data() {
    return {
      msg: false,
      ajaxSend: true,
      isValue: true
    }
  },
  methods: {
    async sendOffer() {
      const offerVal = this.$refs.offer.value
      if (offerVal.length && this.ajaxSend) {
          this.ajaxSend = false;
           await (await fetch(`${this.server}/offers/`, {
            method:'post',
            body: JSON.stringify({offer: offerVal})
           })).json().then(data => {
             if (data) {
              this.$refs.offer.value = '';
              this.msg = true;
              setTimeout(() => { this.msg = false; this.ajaxSend = true; }, 3000)
            }
           })
      } else this.isValue = false
    }
  }
}
</script>

<style lang="scss">
.offer {
  min-height: calc(100vh - 204px);
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
      &-info {
          width: 100%;
        }
    }
  }
   @include for-desktop-up {
    img {
      width: 45%;
      float: right;
      margin-left: 20px;
    }
  }
}
</style>
