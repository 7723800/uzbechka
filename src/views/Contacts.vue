<template>
<div class="contacts">
	<div class="container">
    <h3>Наши контакты</h3>
    <h4>Наш адрес</h4>
    <p>Ресторан "Наша Узбечка" находится по адресу: ул. Ташенова, 11/1</p>
    <h4>Режим работы</h4>
    <p>Круглосуточно 24/7</p>
    <h4>Контактные телефоны</h4>
    <p>Резервирование: <a href="tel:+77758885055">+7 775 888 50 55</a></p>
    <p>Доставка: <a href="tel:+77010478888">+7 701 047 88 88</a></p>
    <h4>Мы в соцсетях</h4>
    <div class="social">
      <div class="instagram">
          <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
          <a href="https://www.instagram.com/nashauzbechka/" target="_blank">nashauzbechka</a>
      </div>
      <div class="facebook">
        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" class="svg-inline--fa fa-facebook-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg>
        <a href="https://www.facebook.com/nashauzbechka/" target="_blank">nashauzbechka</a>
      </div>
    </div>
    <div v-if="screenWidth > screenXL" class="map">
      <l-map :zoom="zoom" :center="center" >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
    </div>
  </div>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
export default {
  name: 'contacts',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom:18,
      center: L.latLng(51.152245, 71.440826),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(51.152298, 71.440836)
    }
  }
}
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
.contacts {
   min-height: calc(100vh - 204px);
   @include for-desktop-up {
      margin-bottom: 30px;
    }
  a {
    font-weight: bold;
    height: 100%;
  }
  .social {
    .instagram, .facebook {
    display: flex;
    align-items: center;
      svg {
        width: 10vw;
        fill: $yellowColor;
        margin: 5px 10px 5px 0;
        @include for-desktop-up {
          width: 40px;
        }
      }
    }
  }
  .map {
    height: 400px; 
    width: 100%;
    .leaflet-pane {
      z-index: 1 !important;
    }
    .leaflet-top, .leaflet-bottom {
      z-index: 2 !important;
    }
  }
}
</style>
