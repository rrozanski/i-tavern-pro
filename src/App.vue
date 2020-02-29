<template>
  <div id="app">
    <MainHeader
        :title="title"
        :subtitle="subtitle"></MainHeader>

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
    import Vue from 'vue';
    import MainHeader from '@/components/MainHeader.vue';

    export default Vue.extend({
        name: 'App',
        components: {
            MainHeader
        },
        data() {
            return {
                title: 'iTavern PRO',
                subtitle: 'Stay awhile and listen!'
            };
        }
    });
</script>

<style lang="scss">
  @import './styles';
</style>
