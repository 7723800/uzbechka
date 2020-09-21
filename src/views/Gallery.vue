<template>
<div class="gallery">
    <div class="container">
        <h3>Наши фотоотчеты</h3>
        <transition-group name="fade-loader" mode="out-in">
        <div :key="1" v-if="images.length" class="grid">
            <div v-for="(img,index) in this.images" :key="index" class="grid-item">
                <img :src="img" >
            </div>
        </div>
        <div :key="2" v-else class="gallery-loader">
          <div class="lds-ripple"><div></div><div></div></div>
        </div>
        </transition-group>
    </div>
</div>
</template>

<script>
export default {
  name: 'gallery',
  components: {
    },
  data() {
      return {
        images: []
      }
    },
    async beforeCreate() {
        await (await fetch(`${this.server}/gallery/`)).json().then(data => {
          this.images = data;
        })
    },
    methods: {
     
    }
}
</script>

<style lang="scss">
.gallery {
    display: inline-flex;
    width: 100%;
    min-height: calc(100vh - 204px);
    .container {
        width: 100%;
        .grid {
            column-count: 2;
            column-gap: 3px;
        }
        .gallery-loader {
            width: 100%;
            height: 85%;
            display: flex;
            align-items: center;
            @include loader;
        }
    @include for-desktop-up {
        .grid {
            column-count: 4;
        }
    }
  }
}
</style>
