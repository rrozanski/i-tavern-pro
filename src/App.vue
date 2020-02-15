<template>
  <div id="app">
    <MainHeader></MainHeader>

    <div class="container my-5">
      <transition
          name="slide-fade"
          mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import MainHeader from '@/components/MainHeader.vue';
  import Vue from 'vue';

  export default Vue.extend({
    name: 'App',
    components: {
      MainHeader
    },
  });
</script>

<style lang="scss">
  @import './styles';
</style>
