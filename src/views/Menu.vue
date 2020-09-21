<template>
  <div class="menu">
  	<div class="menu__header">
  		<div class="container">
		  	<div class="menu__header-wrap">
		  		<carousel v-if="headerMenu" ref="carousel" @dragged="setIndex" :fluidSpeed="500" @changed="setIndex" :nav="false" :center="true" :dots="false" :items="1" :startPosition="currentIndex" :mouseDrag="false" :responsive="options">
			  		<template slot="prev"><span ref="arrowLeft" class="arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/></svg></span></template>
				  		<div v-for="(menuItem, key) in menu" :ref="key" :key="menuItem.order" @click="renderMenu(key, menuItem.order)">{{menuItem.name}}</div>
			  		<template slot="next"><span ref="arrowRight" class="arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg></span></template>
		  		</carousel>
			 </div>
	  	</div>
	</div>
	<!-- start items -->
	<div class="menu__content">
	  	<div class="container">
	  		<transition-group name="fade-items">
			    <div v-for="product in paginatedItems" class="product" :key="product.id">
			    	<picture>
			    		<div v-if="product.price" @click="favItems(product)" class="add-to-fav">
			    			<transition name="toggle-scaled" mode="out-in">
			    			<svg key="1" v-if="product.favorites" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
			    			<svg key="2" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
			    		</transition>
			    		</div>
			    		<vue-load-image>
		    		      	<img slot="image" :src="product.url"/>
		    		      	<img slot="preloader" src="@/assets/images/preloader.jpg"/>
			    		</vue-load-image>
			    	</picture>
			    	<div class="product__content">
			    		<div class="product__name">{{product.name}}</div>
			    		<div class="product__description">
			    			<p>{{product.description}}</p>
			    		</div>
			    		<div v-if="product.extraPrice" class="product-doze">
			    			<div class="product-doze__title">
			    				<p>Порция</p>
			    			</div>
				    		<div class="product-doze__slider">
				    			<div class="product-doze__selector" :class="{'is-mini': product.extraPrice.isMini}"></div>
				    			<div @click="setExtraPrice(product, false)" class="product-doze__standart" :class="{'is-selected': product.extraPrice.isMini}">
				    				<input type="radio" name="doze-standart" value="1" checked>
				    				<label for="doze-standart">Стандартная</label>
				    			</div>
				    			<div @click="setExtraPrice(product, true)" class="product-doze__mini" :class="{'is-selected': !product.extraPrice.isMini}">
				    				<input type="radio" name="doze-mini" value="0">
				    				<label for="doze-mini">Мини</label>
				    			</div>
				    		</div>
			    		</div>
			    		<div class="product__actions">
			    			<div :ref="'productPrice' + product.id" class="product__price">{{product.price.toLocaleString('ru-RU')}}₸</div>
			    			<transition name="change-buttons" mode="out-in">
				    			<div v-if="product.inCart" class="product__quantity">
				    				<button @click="minusOne(product)" type="button" value="-" class="minus">-</button>
	                                <input type="text" :value="product.inCart" class="input-text qty text" readonly>
	                            	<button @click="plusOne(product)" type="button" value="+" class="plus">+</button>
				    			</div>
				    			<button v-else @click="addToCart(product)" class="btn">В корзину</button>
			    			</transition>
			    		</div>
			    	</div>
			    </div>
			</transition-group>
			<paginate v-if="menu[currentMenu].items.length >= this.perPage"
				v-model="pageNumber"
			    :page-count="totalPages"
			    :margin-pages="2"
			    :prev-text="'❮'"
			    :next-text="'❯'"
			    :container-class="'pagination'"
			    :page-class="'page-item'"
			    :prev-class="'page-link'"
			    :next-class="'page-link'"
			    :click-handler="paginateItems">
			  </paginate>
	    </div>
    </div>
    <!-- end items -->
    <!-- start nav -->
    <div class="menu__nav">
    	<div class="container">
	     	<div @click="toggleSearch" class="menu__nav-search">
	     		<span>Поиск</span>
	     		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
	     	</div>
			<div @click="toggleCart" class="menu__nav-basket">
		    	<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
		    	<transition name="fade-quantity">
		    		<div v-show="totalQuantity" class="menu__nav-basket-in">{{ totalQuantity }}</div>
		    	</transition>
		   	</div>
		   	<div @click="toggleFav" class="menu__nav-favorites">
		   		<span>Избранное</span>
	     		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
	     		<transition name="fade-quantity">
		    		<div v-if="inFavorites.length" class="menu__nav-favorites-in"></div>
		    	</transition>
	     	</div>
     	</div>
	</div>
	<!-- end nav -->
	<!-- start fav -->
	<transition name="fade-left">
		<div v-show="favorites" class="menu__favorites">
			<div class="menu__favorites-header">
				<div class="container">
					<div class="wrapper">
						<div @click="toggleFav" class="backward">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/>
							</svg>
							<span v-if="screenWidth > screenXL">Вернуться в меню</span>
						</div>
						<div class="title">Избранное</div>
						<div class="info">
							<div v-if="inFavorites.length" class="svg-container">
								<transition name="toggle-scaled" mode="out-in">
								<svg key="1" v-if="isFavInfo" @click="isFavInfo = !isFavInfo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
								<svg key="2" v-else @click="isFavInfo = !isFavInfo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
							</transition>
								<transition name="fade-items">
									<span v-if="isFavInfo" class="info toolip">Если вы хотите удалить блюдо из избранного, нажмите на иконку &#129505;</span>
								</transition>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu__favorites-content">
				<div class="container">
					<div v-if="inFavorites.length" class="menu__content">
				  		<transition-group name="fade-left">
						    <div v-for="product in inFavorites" class="product" :key="product.id">
						    	<picture>
						    		<vue-load-image>
    				    		      	<img slot="image" :src="product.url"/>
    				    		      	<img slot="preloader" src="@/assets/images/preloader.jpg"/>
    					    		</vue-load-image>
						    		<div @click="removeFromFav(product)" class="remove-item">
						    			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
						    		</div>
						    	</picture>
						    	<div class="product__content">
						    		<div class="product__name">{{product.name}}</div>
						    		<div class="product__description">
						    			<p>{{product.description}}</p>
						    		</div>
			    		    		<div v-if="product.extraPrice" class="product-doze">
			    		    			<div class="product-doze__title">
						    				<p>Порция</p>
						    			</div>
			    			    		<div class="product-doze__slider">
			    			    			<div class="product-doze__selector" :class="{'is-mini': product.extraPrice.isMini}"></div>
			    			    			<div @click="setExtraPrice(product, false)" class="product-doze__standart" :class="{'is-selected': product.extraPrice.isMini}">
			    			    				<input type="radio" name="doze-standart" value="1" checked>
			    			    				<label for="doze-standart">Стандартная</label>
			    			    			</div>
			    			    			<div @click="setExtraPrice(product, true)" class="product-doze__mini" :class="{'is-selected': !product.extraPrice.isMini}">
			    			    				<input type="radio" name="doze-mini" value="0">
			    			    				<label for="doze-mini">Мини</label>
			    			    			</div>
			    			    		</div>
			    		    		</div>
						    		<div class="product__actions">
						    			<div :ref="'favPrice' + product.id" class="product__price">{{product.price.toLocaleString('ru-RU')}}₸</div>
						    			<transition name="change-buttons" mode="out-in">
							    			<div v-if="product.inCart" class="product__quantity">
							    				<button @click="minusOne(product)" type="button" value="-" class="minus">-</button>
				                                <input type="text" :value="product.inCart" class="input-text qty text" readonly>
				                            	<button @click="plusOne(product)" type="button" value="+" class="plus">+</button>
							    			</div>
							    			<button v-else @click="addToCart(product)" class="btn">В корзину</button>
						    			</transition>
						    		</div>
					    		</div>
						    </div>
						</transition-group>
    				</div>
    				<div v-else class="empty-fav">
    					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
    					<h4>У вас нет избранных блюд</h4>
    				</div>
				</div>
			</div>
		</div>
	</transition>
	<!-- end fav -->
	<!-- start search  -->
	<transition name="fade-left">
		<div v-show="search" class="menu__search">
			<div class="menu__search-header">
				<div class="container">
					<div class="wrapper">
						<div @click="toggleSearch" class="backward">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/>
							</svg>
							<span v-if="screenWidth > screenXL">Вернуться в меню</span>
						</div>
						<div class="title">Поиск</div>
						<div class="info"></div>
					</div>
				</div>
			</div>
			<div class="menu__search-content">
				<div class="container">
					<div class="search-wrap">
					  	<input @input="searchHandler" v-model="query" type="text" placeholder="Введите блюдо">
					  	<div class="search">
					  		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
					 	</div>
					 	<transition name="fade-items">
						  	<div v-show="query.length >= 1" @click="query = ''; searchItems = []" class="clear">
						  		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
						  	</div>
					  	</transition>
					</div>
					<div class="menu__content">
						<div v-for="product in searchItems" class="product" :key="product.id">
					    	<picture>
					    		<div @click="favItems(product)" class="add-to-fav">
					    			<transition name="toggle-scaled" mode="out-in">
					    			<svg key="1" v-if="product.favorites" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
					    			<svg key="2" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
					    		</transition>
					    		</div>
					    		<vue-load-image>
				    		      	<img slot="image" :src="product.url"/>
				    		      	<img slot="preloader" src="@/assets/images/preloader.jpg"/>
					    		</vue-load-image>
					    	</picture>
					    	<div class="product__content">
					    		<div v-html="product.highlight" class="product__name"></div>
					    		<div class="product__description">
					    			<p>{{product.description}}</p>
					    		</div>
		    		    		<div v-if="product.extraPrice" class="product-doze">
		    		    			<div class="product-doze__title">
					    				<p>Порция</p>
					    			</div>
		    			    		<div class="product-doze__slider">
		    			    			<div class="product-doze__selector" :class="{'is-mini': product.extraPrice.isMini}"></div>
		    			    			<div @click="setExtraPrice(product, false)" class="product-doze__standart" :class="{'is-selected': product.extraPrice.isMini}">
		    			    				<input type="radio" name="doze-standart" value="1" checked>
		    			    				<label for="doze-standart">Стандартная</label>
		    			    			</div>
		    			    			<div @click="setExtraPrice(product, true)" class="product-doze__mini" :class="{'is-selected': !product.extraPrice.isMini}">
		    			    				<input type="radio" name="doze-mini" value="0">
		    			    				<label for="doze-mini">Мини</label>
		    			    			</div>
		    			    		</div>
		    		    		</div>
					    		<div class="product__actions">
					    			<div :ref="'searchPrice' + product.id" class="product__price">{{product.price.toLocaleString('ru-RU')}}₸</div>
					    			<transition name="change-buttons" mode="out-in">
						    			<div v-if="product.inCart" class="product__quantity">
						    				<button @click="minusOne(product)" type="button" value="-" class="minus">-</button>
			                                <input type="text" :value="product.inCart" class="input-text qty text" readonly>
			                            	<button @click="plusOne(product)" type="button" value="+" class="plus">+</button>
						    			</div>
						    			<button v-else @click="addToCart(product)" class="btn">В корзину</button>
					    			</transition>
					    		</div>
					    	</div>
						</div>
						<div v-if="!searchItems.length && query.length >= 2" class="not-found">
							<span>Ничего не найдено</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
	<!-- end search -->
	<!-- start cart -->
	<transition name="fade-left">
		<div v-show="cart" class="menu__cart">
			<div class="menu__cart-header wrap">
				<div class="container">
					<div class="wrapper">
						<div @click="toggleCart" class="backward">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/>
							</svg>
							<span v-if="screenWidth > screenXL">Вернуться в меню</span>
						</div>
						<div class="title">Корзина</div>
						<div class="info">
							<div v-if="totalQuantity" class="svg-container">
								<transition name="toggle-scaled" mode="out-in">
								<svg key="1" v-if="isLbInfo" @click="isLbInfo = !isLbInfo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
								<svg key="2" v-else @click="isLbInfo = !isLbInfo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
							</transition>
								<transition name="fade-items">
									<span v-if="isLbInfo" class="info toolip">Ланч-бокс &mdash; это контейнер для блюд. Для товаров в собственной упаковке ланч-бокс не учитывается.</span>
								</transition>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu__cart-content">
				<div class="container">
					<div v-if="totalQuantity" class="menu__content">
				  		<transition-group name="fade-left">
						    <div v-for="product in this.$store.state.inBasket" class="product" :key="product.id">
						    	<picture>
						    		<div @click="favItems(product)" class="add-to-fav">
						    			<transition name="toggle-scaled" mode="out-in">
						    			<svg key="1" v-if="product.favorites" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
						    			<svg key="2" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
						    		</transition>
						    		</div>
						    		<vue-load-image>
					    		      	<img slot="image" :src="product.url"/>
					    		      	<img slot="preloader" src="@/assets/images/preloader.jpg"/>
						    		</vue-load-image>
						    		<div @click="removeFromCart(product)" class="delete-item">
						    			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/>
						    			</svg>
						    		</div>
						    	</picture>
						    	<div class="product__content">
						    		<div class="product__name">{{product.name}}</div>
						    		<div class="product__launchbox">
						    			<p v-if="product.launchbox">Ланч-бокс: {{product.inCart}}шт - {{product.inCart * product.launchbox}}₸</p>
						    			<p v-else>Без ланч-бокса</p>
						    		</div>
						    		<div v-if="product.extraPrice && product.extraPrice.isMini" class="product__extraprice">Мини-порция</div>
						    		<div class="product__actions">
    					    			<div v-if="product.launchbox" class="product__price">{{(product.price * product.inCart + (product.inCart * product.launchbox)).toLocaleString('ru-RU')}}₸</div>
    					    			<div v-else class="product__price">{{(product.price * product.inCart).toLocaleString('ru-RU')}}₸</div>
    					    			<transition name="change-buttons" mode="out-in">
    						    			<div class="product__quantity">
    						    				<button @click="minusOne(product)" type="button" value="-" class="minus">-</button>
    			                                <input type="text" :value="product.inCart" class="input-text qty text" readonly>
    			                            	<button @click="plusOne(product)" type="button" value="+" class="plus">+</button>
    						    			</div>
    					    			</transition>
    					    		</div>
						    	</div>
						    </div>
						</transition-group>
						<div class="menu__cart-checkout">
							<div class="totalsum">
								<div>Сумма заказа:</div>
								<div>{{totalSum.toLocaleString('ru-RU')}}₸</div>
							</div>
							<div class="checkout-actions">
								<router-link :to="{name: 'checkout', query: {delivery: 'pickup', title: 'Самовывоз'}}">
									<button class="btn left">Самовывоз</button>
								</router-link>
								<router-link :to="{name: 'checkout', query: {delivery: 'delivery', title: 'Доставка'}}">
									<button class="btn right">Доставка</button>
								</router-link>
							</div>
						</div>
    				</div>
    				<div v-else class="menu__cart-content empty">
						<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
						<h4>Ваша корзина пуста</h4>
					</div>
				</div>
			</div>
		</div>
	</transition>
	<!-- end cart -->
</div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import VueLoadImage from 'vue-load-image'
import NProgress from 'nprogress'
import Paginate from 'vuejs-paginate'
import SmoothScroll from 'smooth-scroll'
import { TweenMax, Power2, TimelineLite } from "gsap";
import ScrambleTextPlugin from '@/assets/scripts/ScrambleTextPlugin';
import { mapState, mapActions, mapMutations} from 'vuex';

export default {
	name: 'Menu',
	components: { 
		carousel,
		'vue-load-image': VueLoadImage,
		NProgress,
		'paginate': Paginate
	},
	data() {
		return {
			currentMenu: String,
			currentIndex: this.$route.params.order || 0,
			isLbInfo: false,
			isFavInfo: false,
			query: '',
			searchItems: [],
			headerMenu: true,
			timer: null,
			pageNumber: 1,
			totalPages: 1,
			perPage: 20,
			options: {
				0: {
					stagePadding: 70
				}, 
				350: {
					stagePadding: 90
				}, 
				400: {
					stagePadding: 110
				},
				1200: {
					items: 8,
					center: false
				}
			},
			isMini: false
		}
	},
	created () {
		if (this.screenWidth < this.screenXL) window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	    if (this.screenWidth < this.screenXL) window.removeEventListener('scroll', this.handleScroll);
	},
	beforeMount() {
		this.$route.params.menu ? this.currentMenu = this.$route.params.menu : this.currentMenu = Object.keys(this.menu)[0]
		if (this.$route.params.isOpenCart) this.toggleCart();
		this.watchInBasket()
	},
	mounted() {
		this.renderMenu()
		if (this.currentIndex != 0) document.querySelector('.arrow-left').parentElement.removeAttribute('style');
		if (this.currentIndex == Object.keys(this.menu).length - 1) this.$refs.carousel.showNext = false
		clearAllBodyScrollLocks()
	},
	methods: {
		...mapMutations(['unpdateItem']),
		setIndex(e) {
			this.currentIndex = e.item.index
		},
		renderMenu(prop, index) {
			const activeElm = Object.keys(this.menu)[this.currentIndex];
			if (prop) this.currentMenu = prop
			if (this.screenWidth > this.screenXL) this.$refs[activeElm][0].offsetParent.classList.add('center')
			if (index != undefined) {
				if (this.screenWidth < this.screenXL) {
					if (index > this.currentIndex) this.$refs.arrowRight.click()
					if (index < this.currentIndex) this.$refs.arrowLeft.click()
				} else {
					this.addCenterXL(prop);
				}
				this.pageNumber = 1;
				NProgress.start();
				this.currentIndex = index;
				setTimeout(() => { NProgress.done() }, 100)
			}
			this.totalPages = Math.ceil(this.menu[this.currentMenu].items.length / this.perPage)
			this.setActiveSlide()
		},
		toggleCart() {
			if (this.favorites || this.search){
			 	this.favorites ? this.toggleFav() : this.toggleSearch()
			 	this.delayToggleFunc('toggleCart')
			} else this.$store.commit('toggleCart')
		},
		toggleFav() {
			if (this.search || this.cart) {
				this.search ? this.toggleSearch() : this.toggleCart()
				this.delayToggleFunc('toggleFav')
			} else this.$store.commit('toggleFav');
		},
		toggleSearch() {
			if (this.favorites || this.cart) {
				this.favorites ? this.toggleFav() : this.toggleCart()
				this.delayToggleFunc('toggleSearch')
			} else this.$store.commit('toggleSearch');
		},
		delayToggleFunc(toggleNav) {
			setTimeout(() => {this.$store.commit(toggleNav)}, 400)
		},
		addToCart(product) {
			this.$store.dispatch('pushToBasket', product);
		},
		removeFromCart(product) {
			product.inCart = 0;
			this.$store.commit('removeFromBasket', product.id);
		},
		plusOne(product) {
			this.$store.dispatch('plusOneItem', product);
		},
		minusOne(product) {
			if (product.inCart > 0) this.$store.dispatch('minusOneItem', product);
			if (product.inCart == 0) this.$store.commit('removeFromBasket', product.id);
		},
		favItems(product) {
			if (!product.favorites) {
				product.favorites = true;
				this.$store.commit('pushToFav', product)
			}
			else {
				product.favorites = false;
				this.$store.commit('removeFromFav', product.id);
			}
		},
		removeFromFav(product) {
			product.favorites = false;
			this.$store.commit('removeFromFav', product.id);
		},
		watchInBasket() {
			this.$store.watch(state => {
				return state.inBasket
			},() => { this.$store.commit('unpdateItemsProperty') }, { deep: true })
		},
		searchHandler() {
			this.searchItems = [];
			for (const menu of Object.keys(this.menu)) {
				this.menu[menu].items.forEach(product => {
					const contain = product.name.toLowerCase().includes(this.query.toLowerCase());
					if (contain && this.query.length >=2) {
						const highlight = product.name.replace(new RegExp(this.query, 'ig'), `<b>${this.query.toLowerCase()}</b>`)
						product.highlight = highlight
						this.searchItems.push(product)
					}
				})
			}
		},
		setActiveSlide() {
			for (const item of document.querySelectorAll('.owl-item')) {
				item.classList.contains('center') ? item.classList.add('active-page') : item.classList.remove('active-page');
			}
		},
		handleScroll() {
			const reBuildMenu = () => {
				this.headerMenu = false
				this.$nextTick(() => {
					this.headerMenu = true
					this.$nextTick(() => {
						if (this.currentIndex) this.$refs.carousel.showPrev = true
						if (this.currentIndex == Object.keys(this.menu).length - 1) this.$refs.carousel.showNext = false
						this.$refs[this.currentMenu][0].offsetParent.classList.add('active-page')
					})
				})
			}
			if (document.scrollingElement.scrollTop >= 20) {
				clearTimeout(this.timer);
	        	this.timer = setTimeout(reBuildMenu , 150 );
			}
		},
		paginateItems() {
			const scroll = new SmoothScroll();
			scroll.animateScroll(0, null, { speed: 200});
		},
		addCenterXL(prop) {
			const itemsElm = document.querySelectorAll('.owl-item');
			for (const item of itemsElm) {
				item.classList.remove('center')
			}
			this.$refs[prop][0].offsetParent.classList.add('center');
		},
		setExtraPrice(item, isMini) {
			if (item.extraPrice.isMini === isMini) return null;
			const productPrice = this.$refs[`productPrice${item.id}`];
			const favPrice = this.$refs[`favPrice${item.id}`];
			const searchPrice = this.$refs[`searchPrice${item.id}`];
			item.extraPrice.isMini ? item.price = item.extraPrice.default : item.price = item.extraPrice.mini;
			item.extraPrice.isMini = !item.extraPrice.isMini;
			const price = item.price.toLocaleString('ru-RU') + '₸';
			for (const priceElm of [productPrice, favPrice, searchPrice]) {
				if (priceElm) TweenMax.to([priceElm], 1, {scrambleText:{text: price, chars:"0123456789", speed: 1, tweenLength:true, ease:Linear.easeNone}})
			}
			this.unpdateItem(item);
		}
	},
	computed: {
		...mapState(['menu', 'favorites', 'search', 'cart', 'inFavorites']),
		totalSum() {
			return this.$store.state.inBasket.reduce((total, item) => {
				return total + (item.price * item.inCart + (item.inCart * item.launchbox)); 
			}, 0)
		},
		totalQuantity() {
			return this.$store.state.inBasket.reduce((total, item) => {
				return total + item.inCart; 
			}, 0)
		},
		paginatedItems() {
			const start = (this.pageNumber - 1) * this.perPage,
			end = start + this.perPage;
			return this.menu[this.currentMenu].items.slice(start, end)
		}
	},
	watch: {
		currentMenu() {
			setTimeout(() => { 
				window.scrollTo(0, 0)
			}, 400)
		},
		cart(newValue) {
			const menu = document.querySelector('.menu__cart-content')
			newValue ? disableBodyScroll(menu) : enableBodyScroll(menu)
		},
		favorites(newValue) {
			const fav = document.querySelector('.menu__favorites-content')
			newValue ? disableBodyScroll(fav) : enableBodyScroll(fav)
		},
		search(newValue) {
			const search = document.querySelector('.menu__search-content')
			newValue ? disableBodyScroll(search) : enableBodyScroll(search)
		},
		menu() {
			this.headerMenu = false
			if (!this.currentIndex) this.currentMenu = Object.keys(this.menu)[0]
			this.$nextTick(() => {
				this.headerMenu = true
				this.$nextTick(() => {
					if (this.screenWidth > this.screenXL) this.addCenterXL(this.currentMenu)
					this.setActiveSlide();
				})
			})
		}
	},
	beforeRouteLeave(to, from, next) {
		const delayRouteLeave = menuToggleFunc => {
			menuToggleFunc
			setTimeout(() => {next() }, 400)
		}
		switch (true) {
		case this.cart: delayRouteLeave(this.toggleCart())
			break;
		case this.favorites: delayRouteLeave(this.toggleFav())
			break;
		case this.search: delayRouteLeave(this.toggleSearch())
			break;
		default: next();
		}
	}
}
</script>
<style lang="scss">
@mixin fadesMenuHeader($deg) {
	content: "";
	position: absolute;
	z-index: 2;
	pointer-events: none;
	top: 0;
	height: 100%;
	width: 45px;
	background-image: linear-gradient($deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.9) 25px,#fff);
}
@mixin arrowsMenuHeader {
	fill: $yellowColor;
	position: absolute;
	top: 0;
	height: 100%;
	cursor: pointer;
	svg {
		padding: 8px 4px;
	}
}
.btn {
	width: 100px;
	background: $mainGradient;
	color: #fff;
	border-radius: $borderRadiusBtn;
	box-shadow: $buttonShadow;
	font-size: 85%;
	height: $inputBtnHeight;
	line-height: $inputBtnHeight;
	cursor: pointer;
}
.menu {
	position: relative;
	@include for-desktop-up {
		min-height: calc(100vh - 245px);
	}
	&__header {
		position: fixed;
		background: #fff;
		padding: 0 10px;
		left: 0;
		right: 0;
		box-shadow: $boxShadow;
		z-index: 101;
		-webkit-overflow-scrolling: auto;
		.owl-item {
			cursor: pointer;
			&.active-page {
				position: relative;
				color: $purpleСolour;
				&::before {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					width: 60%;
					background: $purpleСolour;
					height: 3px;
					margin: auto;
					border-top-right-radius: $borderRadius;
					border-top-left-radius: $borderRadius;
				}
			}
		}
		div {
			height: $heightPixels;
			font-size: 98%;
			text-align: center;
			@include for-desktop-up {
				position: relative;
			}
		}
		&-wrap {
			line-height: $heightPixels;
			.arrow-left {
				@include arrowsMenuHeader;
				left: 6px;
				&::before {
					@include fadesMenuHeader(-90deg);
					left: 16px;
				}
				@include for-desktop-up {
					left: -40px;
					&::before {
						left: 38px;
					}
				}
			}
			.arrow-right {
				@include arrowsMenuHeader;
				right: 0;
				&::before {
					@include fadesMenuHeader(90deg);
					right: 22px;
				}
				@include for-desktop-up {
					right: -40px;
					&::before {
						right: 35px;
						width: 60px;
					}
				}
			}
		}
	}
	&__content {
		padding-top: $heightPixels;
		// -webkit-transform:translateZ(0px);
		@include for-desktop-up {
			& .container > span, & > span {
				display: flex;
				flex-wrap: wrap;
			}
		}
		.product {
			padding: 12px 0;
			display: flex;
			align-items: center;
			position: relative;
			&::before {
				@include linePseudo($top: auto, $bottom: 0);
			}
			picture {
				position: relative;
				margin-left: -30px;
				width: calc(100% / 1.5);
				border-radius: $borderRadius;
				box-shadow: $imgShadow;
				display: flex;
				align-items: flex-start;
				overflow: hidden;
				background: $background;
				.vue-load-image {
					width: 100%;
					display: flex;
					align-items: flex-start;
				}
				@include for-desktop-up {
					margin-left: 0;
					width: 100%;
				}
			}
			.add-to-fav, .remove-item {
				@include itemActions($yellowColor, 80%);
				top: 0;
				border-bottom-left-radius: 5px;
			}
			&__content {
				margin-left: 15px;
				width: 100%;
				min-height: 140px;
				display: flex;
				flex-wrap: wrap;
				@include for-desktop-up {
					margin: 20px 0 10px;
					display: flex;
					flex-wrap: wrap;
					flex: 1;
					flex-direction: column;
				}
			}
			&__description {
				font-size: 80%;
				p {
					display: inline-flex;
					margin: 0.5em 0;
				}
				@include for-desktop-up {
					font-size: 90%;
					width: 100%;
					flex: 1 0 auto;
					min-height: 30px;
				}
			}
			&__name {
				font-size: 105%;
				width: 100%;
			}
			&__launchbox {
				display: flex;
				font-size: 90%;
				align-items: center;
				@include for-desktop-up {
					width: 100%
				}
			}
			&__extraprice {
				font-size: 90%;
				margin-bottom: 5px;
			}
			&__actions {
				display: inline-flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				height: fit-content;
				align-self: flex-end;
			}
			&__price {
				font-size: 110%;
			}
			&__quantity {
				width: 100px;
				.minus {
					@include quantityBtn($leftRadius: $borderRadiusBtn, $rightRadius: 0);
				}
				.plus {
					@include quantityBtn($leftRadius: 0, $rightRadius: $borderRadiusBtn);
				}
				input {
					border: 1px solid $greyColor;
					height: $inputBtnHeight;
					width: 30px;
					float: left;
					padding: 0;
					margin: 0;
					text-align: center;
					border-radius: 0;
					box-shadow: $buttonShadow;
					font-size: 110%;
					pointer-events: none;
				}
			}
			&-doze {
				width: 100%;
				cursor: pointer;
				&__title {
					font-size: 80%;
					color: #999;
					p {
						margin: 0.5em 0;
					}
				}
				&__slider {
					position: relative;
					display: flex;
					margin: 5px 0 1em;
					background-color: rgba(0,0,0,0.07);
					border-radius: 8px;
					overflow: hidden;
					padding: 1px;
					font-size: 85%;
					-webkit-tap-highlight-color: transparent;
				}
				&__standart {
					width: 50%;
					z-index: 2;
					text-align: center;
					transition: all .5s ease;
				}
				&__mini {
					width: 50%;
					text-align: center;
					z-index: 2;
					transition: all .5s ease;
				}
				&__selector {
					position: absolute;
					top: 1px;
					left: calc(0% + 1px);
					height: calc(100% - 2px);
					width: calc(50% - 2px);
					background: #fff;
					border-radius: 8px;
					box-shadow: rgba(6, 5, 50, 0.19) 0px 10px 20px;
					transition: left 0.2s ease-out 0s, width 0.2s ease-out 0s;
					z-index: 0;
					&.is-mini {
						left: calc(50% + 1px);
					}
				}
				.is-selected {
					color: #999;
				}
				label {
					display: inline-block;
					height: 32px;
					line-height: 32px;
					cursor: pointer;
				}
				input {
					position: absolute;
    				left: -9999px;
				}
			}
			@include for-desktop-up {
				box-sizing: border-box;
				padding: 20px;
				width: 25%;
				display: inline-flex;
				flex-direction: column;
			}
		}
		.pagination {
			display: flex;
		    margin: 30px 0;
		    justify-content: center;
		    .page-item, .page-link {
		    	display: flex;
		    	justify-content: center;
		    	align-items: center;
	    	    height: 35px;
	    	    width: 35px;
	    	    color: $purpleСolour;
	    	    background-color: #fff;
	    	    border: 1px solid $greyColor;
	    	    transition: all 0.5s ease;
		    }
		    .active {
		    	box-shadow: $boxShadow;
		    	background: $mainGradient;
		    	color: #fff;
		    }
		}
	}
	&__nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 102;
		background: #fff; 
		height: 50px;
		box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
		font-size: 80%;
		.container {
			padding: 0;
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			@include for-desktop-up {
				padding: auto;
			}
		}
		svg {
			fill: $purpleСolour;
		}
		&-basket, &-search, &-favorites {
			cursor: pointer;
		}
		&-basket {
			background: $mainGradient;
			display: inline-flex;
			padding: 12px;
			border-radius: 35px;
			box-shadow:  $buttonShadow;
			position: relative;
			margin-top: -35px;
			svg {
				fill: #fff;
			}
			&-in {
				color: $purpleСolour;
				position: absolute;
				top: 0;
				right: 0;
				background: #fff;
				border-radius: 20px;
				border: 1px solid $purpleСolour;
				min-width: 18px;
				font-size: 80%;
				padding: 2px 0 2px 1px;
				text-align: center;
				font-size: 100%;
			}
		}
		&-search {
			display: flex;
			flex-direction: column-reverse;
			width: 67px;
			text-align: center;
			svg {
				margin: 0 auto;
			}
		}
		&-favorites {
			position: relative;
			display: flex;
			flex-direction: column-reverse;
			svg {
				margin: 0 auto;
			}
			&-in {
				position: absolute;
				top: 0;
				right: 20px;
				background: $yellowColor;
				height: 10px;
				width: 10px;
				border-radius: 5px;
			}
		}
	}
	&__cart {
		@include cartFavSearchHeader;
		&-header {
			@include menuHeader;
			.svg-container {
				display: inherit;
				svg {
					height: 28px;
					width: 28px;
				}
			}
		}
		&-content {
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			height: calc(100% - 90px);
			.empty {
				@include empty;
			}
			.delete-item{
				@include itemActions(#999, 90%);
				bottom: 0;
				border-top-left-radius: 5px;
			}
			.menu__content {
				padding-top: 0;
				margin-bottom: $headerHeight;
			}
		}
		&-checkout {
			padding: 20px 0;
			.totalsum {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
			}
			.checkout-actions {
				text-align: center;
				.btn {
					margin: 0 1px;
					width: 45%;
					height: 45px;
					border-radius: 30px;
					&.left {
						border-top-right-radius: 0;
						border-bottom-right-radius: 0;
					}
					&.right {
						border-top-left-radius: 0;
						border-bottom-left-radius: 0;
					}
					@include for-desktop-up {
						width: 15%;
					}
				}
			}
		}
	}
	&__favorites {
		@include cartFavSearchHeader;
		&-header {
			@include menuHeader;
			svg {
				height: 28px;
				width: 28px;
			}
		}
		&-content {
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			height: calc(100% - 80px);
			.empty-fav {
				text-align: center;
				padding: 20px 0;
				svg {
					fill:#999;
					height: 100px;
					width: 100px;
				}
			}
		}
		.menu__content {
			padding-top: 0;
			margin-bottom: $headerHeight;
		}
	}
	&__search {
		@include cartFavSearchHeader;
		&-header {
			@include menuHeader;
		}
		&-content {
			padding: 10px 0;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			height: calc(100% - 100px);
			.menu__content {
				padding-top: 0;
				margin-bottom: $headerHeight;
				@include for-desktop-up {
					display: flex;
					flex-wrap: wrap;
				}
				.product__name {
					&::first-letter {
						text-transform: capitalize;
					}
				}
				.not-found {
					padding: 15px 0;
					@include for-desktop-up {
						margin: 0 auto;
					}
				}
			}
			.search-wrap {
				width: 100%;
				position: relative;
				@include for-desktop-up {
					width: 40%;
					margin: 0 auto;
				}
				input {
					width: 100%;
					padding: 10px 40px 10px 40px;
					border: 1px solid $greyColor;
					border-top-left-radius: 30px;
					border-radius: 30px;
					background: #fff;
					transition: all 0.5s ease;
					font-size: 102%;
					&:focus {
						border: 1px solid $yellowColor;
					}
				}
				.search {
					position: absolute;
					top: 12px;
					left: 10px;
					fill: $yellowColor;
					width: 25px;
				}
				.clear {
					position: absolute;
					right: 12px;
					top: 10px;
					fill: #999;
					cursor: pointer;
				}
			}
		}
	}
}
.fade-items-enter-active, .fade-items-leave-active {
	transition: opacity .4s
}
.fade-items-enter, .fade-items-leave-to {
	opacity: 0
}
.fade-left-enter-active, .fade-left-leave-active {
	transition: all .5s ease;
}
.fade-left-enter, .fade-left-leave-to {
	transform: translateX(-15px);
	opacity: 0;
}
.fade-quantity-enter-active, .fade-quantity-leave-active {
	transition: all .5s ease;
}
.fade-quantity-enter, .fade-quantity-leave-to {
	transform: scale(0);
	opacity: 0;
}
.change-buttons-enter-active {animation: coming .25s linear; }
.change-buttons-leave-to {animation: leave .25s linear; }
@keyframes coming {
	from {
		transform: rotateX(90deg); 
	} 
	to {
		transform: rotateX(0deg);
		} 
	}
@keyframes leave {
	from {
		transform: rotateX(0deg);
	} 
	to {
		transform: rotateX(90deg);
	}
}
</style>
