<template>
<div class="checkout">
	<div class="checkout__header">
		<div class="container">
			<div class="wrapper">
				<router-link :to="{name: 'menu', params: {isOpenCart: true}}" class="backward">
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/>
					</svg>
					<span v-if="screenWidth > screenXL">Вернуться в корзину</span>
				</router-link>
				<div class="title">{{$route.query.title || 'Корзина'}}</div>
				<div class="info"></div>
			</div>
		</div>
	</div>
	<div class="checkout__content">
		<div class="container">
			<!-- pickup start -->
			<div v-if="$route.query.delivery == 'pickup'" class="pickup">
				<div class="pickup__adress">
					<h4>Адрес</h4>
					<div>Ресторан "Наша Узбечка"</div>
					<div>ул. Жумабека Ташенова 11/1</div>
					<h4>Доставка и самовывоз круглосуточно</h4>
					<a href="https://m.2gis.kz/astana?lang=ru&mapview=71.441206%2C51.154862%2F16" target="_blank">
						<div class="pickup__adress-map">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
						<span>Открыть карту</span>
					</div>
				</a>
					<div class="form">
						<div class="form__row">
							<div class="form__col-phone">
								<label>Номер телефона</label>
								<input ref="inputPhone" :class="{ incorrect: !isCorrectPhone }" :value="phone" name="phone" class="value" v-imask="mask" @accept="onAccept" @complete="onComplete" type="tel">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col-info">
								<label>Дополнительная информация</label>
								<textarea ref="info" name="info" class="value"></textarea>
							</div>
						</div>
						<div class="form__to-order">
							<router-link :to="{name: 'order'}">
								<button class="btn">Оформить заказ</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<!-- pickup end -->
			<!-- delivery start-->
			<div v-if="$route.query.delivery == 'delivery'">
				<div v-if="$store.state.inBasket.length">
					<div class="form">
						<div class="form__row">
							<div class="form__col-street">
								<label>Улица/Жилой Комплекс</label>
								<input ref="street" name="street" class="value" type="text">
							</div>
							<div class="form__col-house">
								<label>Дом</label>
								<input ref="house" name="house" class="value" type="number">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col">
								<label>Квартира</label>
								<input ref="room" name="room" class="value" type="number">
							</div>
							<div class="form__col">
								<label>Подъезд</label>
								<input ref="entrance" name="entrance" class="value" type="number">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col">
								<label>Код домофона</label>
								<input ref="code" name="code" class="value" type="number">
							</div>
							<div class="form__col">
								<label>Этаж</label>
								<input ref="floor" name="floor" class="value" type="number">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col-phone">
								<label>Номер телефона</label>
								<input ref="inputPhone" :class="{ incorrect: !isCorrectPhone }" :value="phone" name="phone" class="value" v-imask="mask" @accept="onAccept" @complete="onComplete" type="tel">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col-pay">
								<label>Способы оплаты</label>
								<select ref="paymethod" name="change" v-model="selectedPay">
									<option :value="false">Наличными</option>
									<option :value="1">Наличными (без сдачи)</option>
									<option :value="2">Картой курьеру</option>
								</select>
							</div>
							<div class="form__col-change">
								<label>Сдача</label>
								<div v-show="!selectedPay" class="info" :class="{isempty: isEmptyChange}">
									<transition name="toggle-scaled" mode="out-in">
									<svg key="1" v-if="isChangeInfo" @click="isChangeInfo = !isChangeInfo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
									<svg key="2" v-else @click="isChangeInfo = !isChangeInfo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
								</transition>
								<transition name="fade-items">
									<span v-if="isChangeInfo" class="toolip">Укажите сумму, которая у вас. Курьер выдаст сдачу с этой суммы. Если сдачи не нужна, выберите другой способ оплаты.</span>
								</transition>
								</div>
								<input ref="change" @input="checkCorrectChange" :disabled=selectedPay :class="{disabled: selectedPay, incorrect: !isChange}" v-model="change" type="number">
							</div>
						</div>
						<div class="form__row">
							<div class="form__col-info">
								<label>Дополнительная информация</label>
								<textarea ref="info" name="info" class="value"></textarea>
							</div>
						</div>
						<div class="form__row-bill">
							<div class="form__row">
								<div class="form__col-total">
									<div>Сумма заказа</div>
									<div>{{totalSum.toLocaleString('ru-RU')}}₸</div>
								</div>
							</div>
							<div class="form__row">
								<div class="form__col-total">
									<div>Доставка</div>
									<div>1 000₸</div>
								</div>
							</div>
							<div class="form__row">
								<div class="form__col-total">
									<div><b>Итого</b></div>
									<div><b>{{(totalSum + this.deliverySum).toLocaleString('ru-RU')}}₸</b></div>
								</div>
							</div>
						</div>
						<div class="form__to-order">
							<router-link :to="{name: 'order'}">
								<button class="btn">Оформить заказ</button>
							</router-link>
						</div>
					</div>
				</div>
				<div v-else class="checkout__content empty">
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
					<h4>Ваша корзина пуста</h4>
					<router-link :to="{name: 'menu'}">
						<button class="btn">Вернуться в меню</button>
					</router-link>
				</div>
			</div>
			<!-- delivery end -->
		</div>
		<div class="checkout__content-alert" >
			<transition-group name="fade-left" mode="out-in">
				<div v-for="(msg, index) in this.alertMsg" :key="index" class="message">{{msg}}</div>
			</transition-group>
		</div>
	</div>
</div>
</template>

<script>
import {IMaskDirective} from 'vue-imask';
export default {
	name: 'checkout',
	data() {
	  	return {
	  		isChangeInfo: false,
	  		selectedPay: false,
	  		isCorrectPhone: true,
	  		isChange: true,
	  		isEmptyChange: false,
	  		change: null,
	  		phone: localStorage.getItem('phone'),
	  		deliverySum: 1000,
	  		alertMsg: [],
	        mask: {
	          mask: '{+7} (000) 000-00-00',
	          lazy: false,
	          placeholderChar: '•'
	        },
	        createOrder: true
	  	}
	},
	directives: {
      imask: IMaskDirective
    },
	mounted() {
	  	this.inputsVal(false)
	  	this.$route.query.delivery == 'pickup' ? this.selectedPay = 1 : this.selectedPay = false
	},
	methods: {
	  	inputsVal(setVal = true) {
	  		const inputsVal = document.querySelectorAll('.value');
		  	for (const input of inputsVal) {
		  		setVal 
		  		? localStorage.setItem(input.name, input.value) 
		  		: input.value = localStorage.getItem(input.name)
		  	}
		  	this.$nextTick(() => {
		  		if (this.$refs.inputPhone && !this.$refs.inputPhone.value) this.phone = '+7 (•••) •••-••-••';
		  	})
	  	},
	  	order() {
	  		const checkData = () => {
  				if (!this.selectedPay && this.change < (this.totalSum + this.deliverySum)) {
  					this.isChange = false
  					this.isEmptyChange = true
  					this.showMessage('Сдача указана не верно')
  					return false
  				} else {
  					this.isChange = true
  					this.isEmptyChange = false
  					return true
  				}
  			}
  			const checkPhone = () => {
  				const inputVal = this.$refs.inputPhone.value
	  			if (/•/.test(inputVal)) {
	  				this.isCorrectPhone = false
	  				this.showMessage('Номер телефона указан не верно')
	  				return false
	  			} else {
	  				this.isCorrectPhone = true
	  				return true
	  			}
  			}
  			if (checkPhone() && checkData()) return true
  			else return false
	  	},
	  	onAccept (e) {
	        const maskRef = e.detail;
	        maskRef.unmaskedValue.length <= 3 ? this.isCorrectPhone = true : this.isCorrectPhone = false
	    },
	    onComplete (e) {
	        const maskRef = e.detail;
	        this.isCorrectPhone = true
	    },
		checkCorrectChange() {
			if (this.change < (this.totalSum + this.deliverySum)) {
				this.isChange = false
				// this.isEmptyChange = true
			} else {
				this.isChange = true
				// this.isEmptyChange = false
			}
		},
		async sendOrder() {
			this.createOrder = false
		    await (await fetch(`${this.server}/orders/`, {
		    	method:'post',
		    	body: this.$route.query.delivery == 'delivery'
		    		? JSON.stringify({items: this.$store.state.inBasket, street: this.$refs.street.value, house: this.$refs.house.value, room: this.$refs.room.value, entrance: this.$refs.entrance.value, code: this.$refs.code.value, floor: this.$refs.floor.value, phone: this.$refs.inputPhone.value, info: this.$refs.info.value, method: this.$refs.paymethod.selectedOptions[0].label, change: this.change, deliveryTax: this.deliverySum, total : this.totalSum, deliveryType: 'Доставка'})
		    		: JSON.stringify({items: this.$store.state.inBasket, phone: this.$refs.inputPhone.value, info: this.$refs.info.value, total : this.totalSum, deliveryType: 'Самовывоз', deliveryTax: 0, method:'Оплата на месте'})
		    }))
		},
		showMessage(msg) {
			this.alertMsg.push(msg)
	  		setTimeout(() => {this.alertMsg.shift()}, 3000)
		}
	},
	computed: {
	  	totalSum() {
	        return this.$store.state.inBasket.reduce((total, item) => {
	            return total + (item.price * item.inCart + (item.inCart * item.launchbox)); 
	        }, 0);
	    }
  	},
  	watch: {
  		selectedPay() {
  			this.selectedPay ? this.change = null : null
  		}
  	},
  	beforeRouteLeave (to, from, next) {
	  	if (to.name == 'order') {
	  		if (this.order() && this.createOrder) {
	  			this.inputsVal()
	  			this.sendOrder()
	  			this.$nextTick(() => {
	  				next()
	  			})
	  		}
	  	} else next();
	}
}
</script>

<style lang="scss">
.checkout {
	min-height: 80vh;
	&__header {
		@include menuHeader(false);
		position: fixed;
		.info {
			width: auto;
		}
	}
	&__content {
		padding-top: $heightPixels;
		.pickup {
			&__adress {
				margin: 20px 0;
			}
		}
		&-alert {
			position: fixed;
			bottom: 30px;
			z-index: 110;
			width: 100%;
			text-align: center;
			.message {
				background: red;
				display: inline-flex;
				color: #fff;
				padding: 10px;
				border-radius: $borderRadius;
				margin: 5px 0;
				box-shadow: $boxShadow;
			}
		}
		.form {
			@include form(5px 0);
			&__row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 15px;
				&-bill {
					position: relative;
					&::before {
						@include linePseudo($top: -10px);
					}
				}
				@include incorrect;
				.isempty {
					svg {
						fill: red;
					}
				}
			}
			&__col {
				width: 48%;
				&-street {
					width: 69%;
				}
				&-house {
					width: 27%;
				}
				&-phone {
					width: 100%;
				}
				&-pay {
					width: 69%;
					select {
						background: url('data:image/svg+xml;utf8,<svg fill="#F6A20A" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>') no-repeat right center / 15%;
						background-color: #fff;
					}
				}
				&-change {
					width: 27%;
					position: relative;
					svg {
						position: absolute;
						right: 0;
						top: -5px;
						fill: $yellowColor;
					}
					.toolip {
						@include toolip($padding: 10px 5px, $bottom: 80px, $right: 0, 
						$topBefore: 100%, $rightBefore: 2.5%, $borderColor: #999 transparent transparent transparent);
					}
					.disabled {
						background: $greyColor !important;
						border-color: #999 !important;
					}
				}
				&-info {
					width: 100%;
					textarea {
						padding: 0;
					}
				}
				&-total {
					display: flex;
					width: 100%;
					justify-content: space-between;
				}
			}
			&__to-order {
				text-align: center;
				margin: 20px 0;
				.btn {
					width: 80%;
					height: 45px;
					border-radius: 30px;
					@include for-desktop-up {
						width: 15%
					}
				}
			}
		}
		.empty {
			@include empty;
		}
		.pickup__adress {
			&-map {
				border: 1px solid $yellowColor;
				color: $yellowColor;
				border-radius: $borderRadius;
				display: inline-flex;
				align-items: center;
				padding:10px;
				svg {
					fill: $yellowColor;
					padding: 0 5px;
				}
			}
		}
	}
	.fade-left-enter-active, .fade-left-leave-active {
	  transition: all .5s ease;
	}
	.fade-left-enter, .fade-left-leave-to {
		transform: translateY(15px);
	  	opacity: 0;
	}
}
</style>
