<template>
<div class="not-found">
	<div class="container">
        <h2>Страница не найдена</h2>
         <router-link :to="{name: 'home'}">
          <button class="btn">Перейти на главную</button>
        </router-link>
	</div>
</div>
</template>

<script>
export default {
  name: 'notfound'
}
</script>

<style lang="scss" scoped>
.not-found {
    min-height: calc(100vh - 204px);
    background: url(../assets/images/404.svg) 70% 10px/90vw auto no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
        @include btn;
    }
    .container {
        text-align: center;
    }
}
</style>