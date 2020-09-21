<template>
<div class="home-wrap">
	<div class="container">
		<div class="slider-wrap">
			<carousel :nav="false" :dots="false" :smartSpeed="800" :items="1" :margin="20" :responsive="options">
				<img src="@/assets/images/banner.jpeg" />
				<a href="http://dhoreca.kz/" target="_blank">
					<img src="@/assets/images/uzbechka_danilych.jpg" />
				</a>
			</carousel>
		</div>
		<h2>Наше Меню</h2>
	</div>
	<div v-if="screenWidth < screenXL" class="home-menu-wrap">
		<router-link v-for="(menuItem, key) in menu" :to="{name: 'menu', params: {menu: key, order: menuItem.order}}" :key="menuItem.order">
			<div class="home-menu">
				<div class="home-menu__image">
					<vue-load-image>
						<img slot="image"  :src="menuItem.url" >
		    		    <img slot="preloader" src="@/assets/images/preloader.jpg"/>
			    	</vue-load-image>
		    	</div>
				<div class="home-menu__title">{{menuItem.name}}</div>
			</div>
		</router-link>
	</div>
	<div v-else class="home-menu-wrap">
		<div class="container">
			<carousel v-if="reBuildMenu" :nav="false" :dots="false" :items="6" :smartSpeed="500">
				<template slot="prev"><span class="prev menu-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg></span></template>
		  		<router-link v-for="(menuItem, key) in menu" :to="{name: 'menu', params: {menu: key, order: menuItem.order}}" :key="menuItem.order">
		  			<div class="home-menu">
						<div class="home-menu__image">
							<vue-load-image>
								<img slot="image" :src="menuItem.url" >
				    		    <img slot="preloader" src="@/assets/images/preloader.jpg"/>
					    	</vue-load-image>
					    </div>
						<div class="home-menu__title">{{menuItem.name}}</div>
					</div>
				</router-link>
				<template slot="next"><span class="next menu-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg></span></template>
			</carousel>
		</div>
	</div>
	<div class="container">
		<div class="delivery-wrap">
			<div>Доставка по телефону</div>
			<a href="tel:+7 701 047 88 88">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
				<h2>+7 701 047 88 88</h2>
			</a>
			<div>Круглосуточно</div>
		</div>
		</div>
</div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import VueLoadImage from 'vue-load-image'
export default {
  	name: 'home',
  	components: {
    	carousel,
    	'vue-load-image': VueLoadImage
  	},
 	data() {
  		return {
  			menus: this.$store.state.menu,
  			reBuildMenu: true,
  			options: {
  				1200: {
  					items: 2,
  				}
  			}
  		}
  	},
  	computed: {
  		menu() {
  			return this.$store.state.menu
  		}
  	},
  	watch: {
  		menu() {
  			this.reBuildMenu = false
	  		this.$nextTick(() => {
				this.reBuildMenu = true
			})
  		}
  	}
}
</script>

<style lang="scss">
.home-wrap {
	width: 100%;
	padding-top: 15px;
	overflow: hidden;
	.slider-wrap {
		width: 100%;
		img {
			cursor: pointer;
		}
		.owl-stage {
			&-outer {
				touch-action: pan-x;
				overflow: visible;
				img {
					border-radius: $borderRadius;
					box-shadow: $imgShadow;
					margin-bottom: 30px;
				}
			}
		}
	}
	.home-menu {
		display: inline-grid;
		margin-right: 10px;
		&-wrap {
			display: flex;
			padding-bottom: 30px;
			overflow-x: scroll;
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
			padding-left: 11px;
			@include for-desktop-up {
			    overflow-x: hidden;
			    .container {
			    	position: relative;
			    	padding: 0;
			    }
			}
			.menu-btn {
				top: 35%;
				position: absolute;
				z-index: 101;
				width: 55px;
				height: 55px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #fff;
				border-radius: 30px;
				box-shadow: $boxShadow;
				cursor: pointer;
				svg {
					width: auto;
					height: 24px;
				}
			}
			.prev {
				left: -80px;
				svg {
					transform: rotate(180deg);
				}
			}
			.next {
				right: -70px; 
			}
		}
		&__image {
			width: calc((100vw - 30px) / 3 * 2);
			border-radius: $borderRadius;
			box-shadow: $imgShadow;
			margin: 5px;
			overflow: hidden;
			 @include for-desktop-up {
			    width: 95%;
			}
			.vue-load-image {
				width: 100%;
				display: flex;
				align-items: flex-start;
			}
		}
		&__title {
			// color: $purpleСolour;
			background: #fff;
			padding: 8px 14px;
			border-radius: 50px;
			border: 1px solid $purpleСolour;
			margin: -25px auto auto 15px;
		}
	}
	.delivery-wrap {
		padding: 20px 0;
		position: relative;
		div {
			@include for-desktop-up {
			    font-size: 120%;
			}
		}
		&::before {
			@include linePseudo($top: 0);
		}
		a {
			display: flex;
			align-items: center;
			color: $purpleСolour;
			svg {
				fill: $purpleСolour;
				height: 30px;
				width: 30px;
				margin-right: 5px;
			}
		}
	}
}
</style>
